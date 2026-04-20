import { Model, Schema, models, model } from "mongoose";

export const leadStatuses = [
  "neu",
  "kontakt",
  "qualifiziert",
  "gewonnen",
  "verloren",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export type LeadDocument = {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  branche: string;
  status: LeadStatus;
  notes: string;
  source: string;
  createdAt: string;
  updatedAt: string;
};

export type LeadStats = Record<LeadStatus | "total", number>;

export type LeadListResult = {
  leads: LeadDocument[];
  total: number;
  page: number;
  limit: number;
};

export interface LeadModelDocument {
  name: string;
  email?: string;
  phone: string;
  branche: string;
  status: LeadStatus;
  notes: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<LeadModelDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    branche: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: leadStatuses,
      default: "neu",
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
    source: {
      type: String,
      default: "website",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

leadSchema.index({ status: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ name: "text", phone: "text", branche: "text", email: "text" });

export const LeadModel =
  (models.Lead as Model<LeadModelDocument> | undefined) ??
  model<LeadModelDocument>("Lead", leadSchema);
