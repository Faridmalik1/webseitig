import nodemailer, { type Transporter } from "nodemailer";

type FaqInquiryEmailInput = {
  email: string;
  question: string;
};

type LeadCaptureEmailInput = {
  branche: string;
  email?: string;
  name: string;
  phone: string;
};

type FaqInquiryEmailResult = {
  adminSent: boolean;
  senderSent: boolean;
};

type LeadCaptureEmailResult = {
  adminSent: boolean;
  senderSent: boolean;
};

type MailerConfig = {
  adminEmail: string;
  fromEmail: string;
  host: string;
  pass: string;
  port: number;
  user: string;
};

let cachedTransporter: Transporter | null = null;

function getMailerConfig(): MailerConfig {
  const host = process.env.SMTP_HOST;
  const portValue = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const adminEmail = process.env.ADMIN_EMAIL;
  const fromEmail = process.env.SMTP_USER;

  if (!host || !portValue || !user || !pass || !adminEmail || !fromEmail) {
    throw new Error("SMTP email is not fully configured.");
  }

  const port = Number(portValue);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("SMTP_PORT must be a valid port number.");
  }

  return {
    adminEmail,
    fromEmail,
    host,
    pass,
    port,
    user,
  };
}

function getTransporter() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const { host, pass, port, user } = getMailerConfig();

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  return cachedTransporter;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailShell(content: string) {
  return `
    <div style="margin:0; padding:0; background:#0f0f0f;">
      <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
        WebSeitig inquiry update
      </div>
      <div style="background:
        radial-gradient(circle at top left, rgba(200,241,53,0.18), transparent 34%),
        radial-gradient(circle at bottom right, rgba(200,241,53,0.12), transparent 28%),
        linear-gradient(180deg, #151515 0%, #0f0f0f 100%);
        padding:32px 16px;">
        <div style="max-width:680px; margin:0 auto; font-family: Arial, sans-serif; color:#f4f6ee;">
          <div style="background:#171717; border:1px solid rgba(200,241,53,0.16); border-radius:28px; overflow:hidden; box-shadow:0 24px 80px rgba(0,0,0,0.45);">
            <div style="height:6px; background:linear-gradient(90deg, #C8F135 0%, #e3ff6f 100%);"></div>
            <div style="padding:34px 30px 30px;">
              ${content}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildAdminHtml(input: FaqInquiryEmailInput) {
  const email = escapeHtml(input.email);
  const question = escapeHtml(input.question).replaceAll("\n", "<br />");

  return buildEmailShell(`
    <h1 style="margin:0 0 14px; color:#ffffff; font-size:32px; line-height:1.15; font-weight:800;">
      New FAQ inquiry received
    </h1>
    <div style="margin:0 0 18px; padding:18px 20px; border-radius:18px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08);">
      <p style="margin:0 0 8px; color:rgba(244,246,238,0.5); font-size:12px; letter-spacing:0.1em; text-transform:uppercase;">
        Sender Email
      </p>
      <p style="margin:0; color:#ffffff; font-size:18px; line-height:1.5; font-weight:700;">
        ${email}
      </p>
    </div>
    <div style="padding:22px; border-radius:22px; background:linear-gradient(180deg, rgba(200,241,53,0.1) 0%, rgba(255,255,255,0.02) 100%); border:1px solid rgba(200,241,53,0.18);">
      <p style="margin:0 0 10px; color:#C8F135; font-size:12px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;">
        Question
      </p>
      <div style="color:#f4f6ee; font-size:16px; line-height:1.8;">
        ${question}
      </div>
    </div>
  `);
}

function buildSenderHtml(input: FaqInquiryEmailInput) {
  const question = escapeHtml(input.question).replaceAll("\n", "<br />");

  return buildEmailShell(`
    <h1 style="margin:0 0 14px; color:#ffffff; font-size:28px; line-height:1.15; font-weight:800;">
      Wir haben Ihre Nachricht erhalten, und unser Team von webseitig wird sich in Kürze bei Ihnen melden.
    </h1>
    <p style="margin:0 0 14px; color:rgba(244,246,238,0.82); font-size:17px; line-height:1.75;">
     Wir haben Ihre Nachricht erhalten, und unser Team von webseitig wird sich in Kürze bei Ihnen melden.
    </p>
    <p style="margin:0 0 26px; color:rgba(244,246,238,0.62); font-size:15px; line-height:1.75;">
      Wir schätzen Ihr Interesse und werden uns so schnell wie möglich mit der passenden Unterstützung für Ihre Anfrage bei Ihnen melden.
    </p>
    <div style="padding:22px; border-radius:22px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08);">
      <p style="margin:0 0 10px; color:#C8F135; font-size:12px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;">
        Ihre Nachricht
      </p>
      <div style="color:#f4f6ee; font-size:16px; line-height:1.8;">
        ${question}
      </div>
    </div>
  `);
}

function buildLeadAdminHtml(input: LeadCaptureEmailInput) {
  const name = escapeHtml(input.name);
  const phone = escapeHtml(input.phone);
  const branche = escapeHtml(input.branche);
  const email = input.email ? escapeHtml(input.email) : "Not provided";

  return buildEmailShell(`
    <p style="margin:0 0 12px; color:#C8F135; font-size:12px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase;">
      New Lead
    </p>
    <h1 style="margin:0 0 14px; color:#ffffff; font-size:32px; line-height:1.15; font-weight:800;">
      New contact request received
    </h1>
    <p style="margin:0 0 26px; color:rgba(244,246,238,0.68); font-size:16px; line-height:1.7;">
      A visitor submitted the consultation form from the website.
    </p>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin:0 0 18px;">
      <div style="padding:18px 20px; border-radius:18px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08);">
        <p style="margin:0 0 8px; color:rgba(244,246,238,0.5); font-size:12px; letter-spacing:0.1em; text-transform:uppercase;">Name</p>
        <p style="margin:0; color:#ffffff; font-size:18px; line-height:1.5; font-weight:700;">${name}</p>
      </div>
      <div style="padding:18px 20px; border-radius:18px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08);">
        <p style="margin:0 0 8px; color:rgba(244,246,238,0.5); font-size:12px; letter-spacing:0.1em; text-transform:uppercase;">Phone</p>
        <p style="margin:0; color:#ffffff; font-size:18px; line-height:1.5; font-weight:700;">${phone}</p>
      </div>
    </div>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
      <div style="padding:18px 20px; border-radius:18px; background:linear-gradient(180deg, rgba(200,241,53,0.1) 0%, rgba(255,255,255,0.02) 100%); border:1px solid rgba(200,241,53,0.18);">
        <p style="margin:0 0 8px; color:#C8F135; font-size:12px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;">Email</p>
        <p style="margin:0; color:#f4f6ee; font-size:16px; line-height:1.7;">${email}</p>
      </div>
      <div style="padding:18px 20px; border-radius:18px; background:linear-gradient(180deg, rgba(200,241,53,0.1) 0%, rgba(255,255,255,0.02) 100%); border:1px solid rgba(200,241,53,0.18);">
        <p style="margin:0 0 8px; color:#C8F135; font-size:12px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;">Industry</p>
        <p style="margin:0; color:#f4f6ee; font-size:16px; line-height:1.7;">${branche}</p>
      </div>
    </div>
  `);
}

function buildLeadSenderHtml(input: LeadCaptureEmailInput) {
  const name = escapeHtml(input.name);
  const phone = escapeHtml(input.phone);
  const branche = escapeHtml(input.branche);
  const email = input.email ? escapeHtml(input.email).replace('@', '&#64;') : "Not provided";

  return buildEmailShell(`
    <h1 style="margin:0 0 14px; color:#ffffff; font-size:28px; line-height:1.15; font-weight:800;">
      Wir haben Ihre Nachricht erhalten, und unser Team von webseitig wird sich in Kürze bei Ihnen melden.
    </h1>
    <p style="margin:0 0 14px; color:rgba(244,246,238,0.82); font-size:17px; line-height:1.75;">
      Wir schätzen Ihr Interesse und werden uns so schnell wie möglich mit der passenden Unterstützung für Ihre Anfrage bei Ihnen melden.
    </p>
    <div style="padding:22px; border-radius:22px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08);">
      <p style="margin:0 0 12px; color:#C8F135; font-size:12px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;">Your Details</p>
      <p style="margin:0 0 8px; color:#f4f6ee; font-size:16px; line-height:1.7;"><strong>Name:</strong> ${name}</p>
      <p style="margin:0 0 8px; color:#f4f6ee; font-size:16px; line-height:1.7;"><strong>Email:</strong> ${email}</p>
      <p style="margin:0 0 8px; color:#f4f6ee; font-size:16px; line-height:1.7;"><strong>Phone:</strong> ${phone}</p>
      <p style="margin:0; color:#f4f6ee; font-size:16px; line-height:1.7;"><strong>Industry:</strong> ${branche}</p>
    </div>
  `);
}

export async function sendFaqInquiryEmails(input: FaqInquiryEmailInput) {
  const { adminEmail, fromEmail } = getMailerConfig();
  const transporter = getTransporter();
console.log("input",input)
  const result: FaqInquiryEmailResult = {
    adminSent: false,
    senderSent: false,
  };

  await transporter.sendMail({
    from: fromEmail,
    to: adminEmail,
    replyTo: input.email,
    subject: "New FAQ inquiry from website",
    text: `Sender email: ${input.email}\n\nQuestion:\n${input.question}`,
    html: buildAdminHtml(input),
  });

  result.adminSent = true;

  await transporter.sendMail({
    from: fromEmail,
    to: input.email,
    subject: "Vielen Dank für Ihre Kontaktaufnahme mit webseitig.",
    text:
      "Vielen Dank für Ihre Anfrage. Unser Team von webseitig wird sich in Kürze bei Ihnen melden.",
    html: buildSenderHtml(input),
  });

  result.senderSent = true;
console.log("result",result)

  return result;
}

export async function sendLeadCaptureEmails(input: LeadCaptureEmailInput) {
  const { adminEmail, fromEmail } = getMailerConfig();
  const transporter = getTransporter();

  const result: LeadCaptureEmailResult = {
    adminSent: false,
    senderSent: false,
  };

  await transporter.sendMail({
    from: fromEmail,
    to: adminEmail,
    replyTo: input.email || undefined,
    subject: "New website lead received",
    text:
      `Name: ${input.name}\n` +
      `Phone: ${input.phone}\n` +
      `Industry: ${input.branche}\n` +
      `Email: ${input.email || "Not provided"}`,
    html: buildLeadAdminHtml(input),
  });

  result.adminSent = true;

  if (!input.email) {
    return result;
  }

  await transporter.sendMail({
    from: fromEmail,
    to: input.email,
    subject: "Vielen Dank für Ihre Kontaktaufnahme mit webseitig.",
    text:
      "Vielen Dank für Ihre Anfrage. Unser Team von webseitig wird sich in Kürze bei Ihnen melden.",
    html: buildLeadSenderHtml(input),
  });

  result.senderSent = true;

  return result;
}
