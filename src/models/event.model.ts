import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IEvent extends Document {
  eventId: string;
  organiserId: string;
  venue: string;
  organiserUPI: string;
  organiserQR: string;
  location: string;
  date: Date;
  startTime: string;
  endTime: string;
  totalTickets: number;
  ticketsSold: number;
  ticketPrice: number;
  attendees: string[];
  coverImage?: string;
  isActive: boolean;
  createdAt: Date;
  eventDescription: string;
  eventStatus: string;
  eventName:string;
  city:string;
}

export enum EVENT_STATUS {
  UPCOMING = "UPCOMING",
  LIVE = "LIVE",
  COMPLETED = "COMPLETED",
}

const eventSchema: Schema = new Schema(
  {
    eventId: { type: String, default: uuidv4, unique: true },
    organiserId: { type: String, required: true },
    venue: { type: String, required: true },
    organiserUPI: { type: String, required: true },
    organiserQR: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    totalTickets: { type: Number, required: true },
    ticketsSold: { type: Number, default: 0 },
    ticketPrice: { type: Number, required: true },
    attendees: {
      type: [
        {
          name: { type: String, required: true },
          email: { type: String, required: true },
          phone: { type: Number, required: true },
        },
      ],
      default: [],
    },
    coverImage: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    eventDescription: { type: String, required: true },
    eventStatus: {
      type: String,
      enum: Object.values(EVENT_STATUS),
      default: EVENT_STATUS.UPCOMING,
    },
    eventName:{type:String,required:true},
    city:{type:String,required:true},
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model<IEvent>("EventTable", eventSchema);
