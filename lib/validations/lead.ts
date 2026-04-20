import { z } from "zod";
import { leadStatuses } from "@/lib/models/Lead";

export const createLeadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().optional(),
  phone: z.string().trim().min(1).max(50),
  branche: z.string().trim().min(1).max(100),
  source: z.string().trim().max(50).optional(),
});

export const updateLeadSchema = z
  .object({
    status: z.enum(leadStatuses).optional(),
    notes: z.string().trim().max(2000).optional(),
  })
  .refine((value) => value.status !== undefined || value.notes !== undefined, {
    message: "At least one field must be provided.",
  });

export const leadQuerySchema = z.object({
  status: z.enum(["alle", ...leadStatuses]).optional().default("alle"),
  search: z.string().trim().max(100).optional().default(""),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(50),
});
