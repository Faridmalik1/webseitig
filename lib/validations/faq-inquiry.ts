import { z } from "zod";

export const createFaqInquirySchema = z.object({
  email: z.string().trim().email(),
  question: z.string().trim().min(1).max(2000),
});
