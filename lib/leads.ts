import { FilterQuery } from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";
import {
  LeadDocument,
  LeadListResult,
  LeadModel,
  LeadModelDocument,
  LeadStats,
} from "@/lib/models/Lead";
import { createLeadSchema, updateLeadSchema } from "@/lib/validations/lead";

function serializeLead(lead: {
  _id: { toString(): string };
  name: string;
  email?: string;
  phone: string;
  branche: string;
  status: LeadDocument["status"];
  notes: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}): LeadDocument {
  return {
    _id: lead._id.toString(),
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    branche: lead.branche,
    status: lead.status,
    notes: lead.notes,
    source: lead.source,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
  };
}

export async function createLead(input: unknown) {
  const data = createLeadSchema.parse(input);
  await connectToDatabase();

  const lead = await LeadModel.create({
    ...data,
    email: data.email || undefined,
  });

  return serializeLead(lead);
}

export async function listLeads(options: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<LeadListResult> {
  await connectToDatabase();

  const page = options.page ?? 1;
  const limit = options.limit ?? 50;
  const filter: FilterQuery<LeadModelDocument> = {};

  if (options.status && options.status !== "alle") {
    filter.status = options.status;
  }

  if (options.search) {
    filter.$or = [
      { name: { $regex: options.search, $options: "i" } },
      { phone: { $regex: options.search, $options: "i" } },
      { branche: { $regex: options.search, $options: "i" } },
      { email: { $regex: options.search, $options: "i" } },
    ];
  }

  const [leads, total] = await Promise.all([
    LeadModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    LeadModel.countDocuments(filter),
  ]);

  return {
    leads: leads.map(serializeLead),
    total,
    page,
    limit,
  };
}

export async function getLeadStats(): Promise<LeadStats> {
  await connectToDatabase();

  const stats = await LeadModel.aggregate<{ _id: string; count: number }>([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const result: LeadStats = {
    neu: 0,
    kontakt: 0,
    qualifiziert: 0,
    gewonnen: 0,
    verloren: 0,
    total: 0,
  };

  for (const stat of stats) {
    if (stat._id in result) {
      result[stat._id as keyof LeadStats] = stat.count;
      result.total += stat.count;
    }
  }

  return result;
}

export async function updateLead(id: string, input: unknown) {
  const data = updateLeadSchema.parse(input);
  await connectToDatabase();

  const lead = await LeadModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  ).lean();

  return lead ? serializeLead(lead) : null;
}

export async function deleteLead(id: string) {
  await connectToDatabase();
  await LeadModel.findByIdAndDelete(id);
}
