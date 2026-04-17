import mongoose, { type Document, type Model } from "mongoose";

export type LeadStatus = "neu" | "kontakt" | "qualifiziert" | "gewonnen" | "verloren";

export interface ILead extends Document {
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

const LeadSchema = new mongoose.Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    branche: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["neu", "kontakt", "qualifiziert", "gewonnen", "verloren"],
      default: "neu",
    },
    notes: { type: String, default: "" },
    source: { type: String, default: "website" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

LeadSchema.index({ status: 1 });
LeadSchema.index({ createdAt: -1 });

export const Lead: Model<ILead> =
  mongoose.models.Lead ?? mongoose.model<ILead>("Lead", LeadSchema);
