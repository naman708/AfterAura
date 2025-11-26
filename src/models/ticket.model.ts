import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface ITicket extends Document {
  ticketId: string;
  eventId: string;
  userId: string;
  eventName: string;
  venue: string;
  startTime: string;
  endTime: string;
  price: number;
  userName: string;
  userEmail: string;
  ticketsQuantity:number;
}

const ticketSchema: Schema = new Schema(
  {
    ticketId: { type: String, default: uuidv4, unique: true },
    eventId: { type: String, required: true, ref: "EventTable" },
    userId: { type: String, required: true, ref: "UserTable" },
    eventName: { type: String, required: true },
    venue: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    price: { type: Number, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    ticketsQuantity:{type:Number,required:true}
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

// Indexes for performance
ticketSchema.index({ eventId: 1 });
ticketSchema.index({ userId: 1 });
ticketSchema.index({ userEmail: 1 });

export default mongoose.model<ITicket>("TicketTable", ticketSchema);
