import { Router } from "express";
import { z } from "zod";
import { Lead } from "../models/Lead";
import { getLeadEmailConfigStatus, sendLeadEmails } from "../lib/mailer";
import { isDbConnected } from "../lib/mongodb";

const leadsRouter = Router();

// ── Admin auth middleware ──────────────────────────────────────────────────
function adminAuth(req: any, res: any, next: any) {
  const key = req.headers["x-admin-key"] as string | undefined;
  const adminKey = process.env.CRM_ADMIN_KEY;
  if (!adminKey || key !== adminKey) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

// ── Validation schemas ─────────────────────────────────────────────────────
const CreateLeadSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(1).max(50),
  branche: z.string().min(1).max(100),
});

const UpdateLeadSchema = z.object({
  status: z.enum(["neu", "kontakt", "qualifiziert", "gewonnen", "verloren"]).optional(),
  notes: z.string().max(2000).optional(),
});

// ── POST /api/leads — create lead from website form ────────────────────────
leadsRouter.post("/leads", async (req, res) => {
  const parse = CreateLeadSchema.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Ungültige Eingabe", details: parse.error.issues });
    return;
  }

  const data = parse.data;

  try {
    if (!isDbConnected()) {
      req.log.error({ data }, "Lead creation blocked — DB not connected");
      res.status(503).json({
        error: "Datenbank nicht verbunden",
        details: ["MONGODB_URI"],
      });
      return;
    }

    const emailConfig = getLeadEmailConfigStatus();
    if (!emailConfig.configured) {
      req.log.error({ missing: emailConfig.missing, data }, "Lead creation blocked — SMTP not configured");
      res.status(503).json({
        error: "E-Mail Versand nicht konfiguriert",
        details: emailConfig.missing,
      });
      return;
    }

    const lead = await Lead.create({
      name: data.name,
      email: data.email || undefined,
      phone: data.phone,
      branche: data.branche,
    });

    try {
      await sendLeadEmails(data);
    } catch (err) {
      req.log.error({ err, leadId: lead._id }, "Lead saved but email notification failed");
    }

    res.status(201).json({ success: true, id: lead._id });
  } catch (err) {
    req.log.error({ err }, "Failed to create lead");
    res.status(500).json({ error: "Fehler beim Speichern" });
  }
});

// ── GET /api/leads — list all leads (CRM) ─────────────────────────────────
leadsRouter.get("/leads", adminAuth, async (req, res) => {
  if (!isDbConnected()) {
    res.json({ leads: [], total: 0 });
    return;
  }

  const status = req.query.status as string | undefined;
  const search = req.query.search as string | undefined;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Number(req.query.limit) || 50);

  const filter: Record<string, unknown> = {};
  if (status && status !== "alle") filter.status = status;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { branche: { $regex: search, $options: "i" } },
    ];
  }

  const [leads, total] = await Promise.all([
    Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Lead.countDocuments(filter),
  ]);

  res.json({ leads, total, page, limit });
});

// ── GET /api/leads/stats — counts by status ────────────────────────────────
leadsRouter.get("/leads/stats", adminAuth, async (req, res) => {
  if (!isDbConnected()) {
    res.json({ neu: 0, kontakt: 0, qualifiziert: 0, gewonnen: 0, verloren: 0, total: 0 });
    return;
  }

  const stats = await Lead.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const result: Record<string, number> = {
    neu: 0, kontakt: 0, qualifiziert: 0, gewonnen: 0, verloren: 0, total: 0,
  };

  for (const s of stats) {
    result[s._id as string] = s.count;
    result.total += s.count;
  }

  res.json(result);
});

// ── PATCH /api/leads/:id — update status + notes ───────────────────────────
leadsRouter.patch("/leads/:id", adminAuth, async (req, res) => {
  const parse = UpdateLeadSchema.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Ungültige Eingabe" });
    return;
  }

  if (!isDbConnected()) {
    res.status(503).json({ error: "Datenbank nicht verbunden" });
    return;
  }

  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { $set: parse.data },
    { new: true, runValidators: true },
  ).lean();

  if (!lead) {
    res.status(404).json({ error: "Lead nicht gefunden" });
    return;
  }

  res.json({ lead });
});

// ── DELETE /api/leads/:id ──────────────────────────────────────────────────
leadsRouter.delete("/leads/:id", adminAuth, async (req, res) => {
  if (!isDbConnected()) {
    res.status(503).json({ error: "Datenbank nicht verbunden" });
    return;
  }
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default leadsRouter;
