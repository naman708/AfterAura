import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser extends Document {
  userName: string;
  userEmail: string;
  userMobileNumber: number;
  isUserOrganiser: boolean;
  kycDocumentFront: string;
  kycDocumentBack: string;
  OrganiserUPI: string;
  OrganiserQR: string;
  userAddress: string;
  password: string;
  userId: string;
  organiserId: string;
}

const userSchema: Schema = new Schema(
  {
    userId: { type: String, default: uuidv4, unique: true },
    userName: { type: String, required: true, trim: true },
    userEmail: { type: String, required: true, unique: true, lowercase: true },
    userMobileNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    userAddress: { type: String, required: true },

    // Organiser fields
    isUserOrganiser: { type: Boolean, default: false },
    organiserId: { type: String, default: uuidv4 },
    OrganiserUPI: { type: String },
    OrganiserQR: { type: String },

    // KYC Documents
    kycDocumentFront: { type: String },
    kycDocumentBack: { type: String },
  },
  {
    timestamps: true, 
  }
);

userSchema.index({ userEmail: 1 });
userSchema.index({ userMobileNumber: 1 });
userSchema.index({ isUserOrganiser: 1 });

export default mongoose.model<IUser>("UserTable", userSchema);
