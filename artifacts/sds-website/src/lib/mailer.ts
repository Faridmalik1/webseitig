import nodemailer from "nodemailer";

export interface LeadFormData {
  name: string;
  email?: string;
  phone: string;
  branche: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  language?: string;
}

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export function getLeadEmailConfigStatus(): { configured: boolean; missing: string[] } {
  const required = [
    ["SMTP_HOST", process.env.SMTP_HOST],
    ["SMTP_USER", process.env.SMTP_USER],
    ["SMTP_PASS", process.env.SMTP_PASS],
    ["ADMIN_EMAIL", process.env.ADMIN_EMAIL],
  ] as const;

  const missing = required.filter(([, value]) => !value).map(([name]) => name);
  return { configured: missing.length === 0, missing };
}

function adminTemplate(data: LeadFormData): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>Neuer Lead — web.seitig</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#0f0f0f; color:#fff; }
    .wrap { max-width:560px; margin:32px auto; background:#1a1a1a; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); }
    .header { background:#171717; padding:28px 32px; border-bottom:1px solid rgba(255,255,255,0.07); }
    .logo { font-weight:800; font-size:20px; color:#fff; letter-spacing:-0.5px; }
    .logo span { color:#C8E646; }
    .badge { display:inline-block; background:#C8E646; color:#171717; font-size:11px; font-weight:700; padding:3px 10px; border-radius:20px; margin-top:8px; }
    .body { padding:28px 32px; }
    .field { margin-bottom:18px; }
    .label { font-size:11px; font-weight:600; color:rgba(255,255,255,0.35); text-transform:uppercase; letter-spacing:1px; margin-bottom:5px; }
    .value { font-size:15px; color:#fff; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-left:3px solid #C8E646; border-radius:8px; padding:10px 14px; }
    .footer { background:#141414; padding:16px 32px; text-align:center; font-size:12px; color:rgba(255,255,255,0.25); border-top:1px solid rgba(255,255,255,0.05); }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="logo">web<span>.</span>seitig</div>
      <div class="badge">🔔 Neuer Lead</div>
    </div>
    <div class="body">
      <div class="field"><div class="label">Name</div><div class="value">${data.name}</div></div>
      ${data.email ? `<div class="field"><div class="label">E-Mail</div><div class="value">${data.email}</div></div>` : ""}
      <div class="field"><div class="label">WhatsApp / Telefon</div><div class="value">${data.phone}</div></div>
      <div class="field"><div class="label">Branche</div><div class="value">${data.branche}</div></div>
    </div>
    <div class="footer">© 2025 web.seitig — Snow Dream Studios GmbH</div>
  </div>
</body>
</html>`;
}

function userConfirmationTemplate(data: LeadFormData): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>Wir haben deine Anfrage erhalten!</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#0f0f0f; color:#fff; }
    .wrap { max-width:560px; margin:32px auto; background:#1a1a1a; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); }
    .header { background:#171717; padding:28px 32px; text-align:center; border-bottom:1px solid rgba(255,255,255,0.07); }
    .logo { font-weight:800; font-size:20px; color:#fff; letter-spacing:-0.5px; margin-bottom:12px; }
    .logo span { color:#C8E646; }
    .check { width:56px; height:56px; border-radius:50%; background:rgba(200,230,70,0.15); display:flex; align-items:center; justify-content:center; margin:0 auto 12px; font-size:24px; }
    .title { font-size:22px; font-weight:800; color:#fff; }
    .body { padding:28px 32px; }
    p { color:rgba(255,255,255,0.6); font-size:15px; line-height:1.65; margin-bottom:14px; }
    strong { color:#fff; }
    .footer { background:#141414; padding:16px 32px; text-align:center; font-size:12px; color:rgba(255,255,255,0.25); border-top:1px solid rgba(255,255,255,0.05); }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="logo">web<span>.</span>seitig</div>
      <div class="check">✓</div>
      <div class="title">Danke, ${data.name}!</div>
    </div>
    <div class="body">
      <p>Wir haben deine Anfrage erhalten und melden uns <strong>innerhalb von 24 Stunden</strong> per WhatsApp bei dir.</p>
      <p>Deine Angaben:<br>
        📱 <strong>${data.phone}</strong><br>
        🏢 <strong>${data.branche}</strong>
      </p>
      <p style="color:rgba(255,255,255,0.35);font-size:13px;">Kein Spam. Keine Kosten. Deine Daten werden nicht weitergegeben.</p>
    </div>
    <div class="footer">© 2025 web.seitig — Snow Dream Studios GmbH</div>
  </div>
</body>
</html>`;
}

export async function sendLeadEmails(data: LeadFormData): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const transport = createTransport();

  if (!transport || !adminEmail) {
    console.info("SMTP not configured — lead email not sent (mock mode)");
    return;
  }

  const fromEmail = process.env.SMTP_USER!;
  const jobs: Promise<unknown>[] = [
    transport.sendMail({
      from: `"web.seitig" <${fromEmail}>`,
      to: adminEmail,
      subject: `🔔 Neuer Lead: ${data.name} (${data.branche})`,
      html: adminTemplate(data),
    }),
  ];

  if (data.email) {
    jobs.push(
      transport.sendMail({
        from: `"web.seitig" <${fromEmail}>`,
        to: data.email,
        subject: "Wir melden uns bei dir — web.seitig",
        html: userConfirmationTemplate(data),
      }),
    );
  }

  try {
    await Promise.all(jobs);
    console.info("Lead emails sent", { name: data.name, adminEmail });
  } catch (err) {
    console.error("Failed to send lead emails", err, { data });
  }
}

export async function sendContactEmails(data: ContactFormData): Promise<void> {
  const transport = createTransport();
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!transport || !adminEmail) {
    console.info("SMTP not configured — contact email not sent (mock mode)");
    return;
  }
  const fromEmail = process.env.SMTP_USER!;
  try {
    await transport.sendMail({
      from: `"web.seitig" <${fromEmail}>`,
      to: adminEmail,
      subject: `Kontaktanfrage: ${data.name}`,
      html: `<p><b>Name:</b> ${data.name}</p><p><b>E-Mail:</b> ${data.email}</p><p><b>Nachricht:</b> ${data.message ?? ""}</p>`,
    });
  } catch (err) {
    console.error("Failed to send contact email", err, { data });
  }
}
