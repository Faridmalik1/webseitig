import { Router } from "express";
import { SubmitContactBody } from "@workspace/api-zod";
import { sendContactEmails } from "../lib/mailer";

const contactRouter = Router();

contactRouter.post("/contact", async (req, res) => {
  const parseResult = SubmitContactBody.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({ success: false, error: "Invalid form data" });
    return;
  }

  const formData = parseResult.data;

  try {
    await sendContactEmails(formData);
    res.json({ success: true, message: "Your message has been sent successfully." });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ success: false, error: "Failed to send email. Please try again later." });
  }
});

export default contactRouter;
