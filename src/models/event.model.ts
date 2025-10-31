
import mongoose,{Schema,Document} from "mongoose";
import {v4 as uuidv4} from 'uuid';


export interface IEvent extends Document {
  eventId:string;
  organiserId:string;
  venue:string;
  organiserUPI:string;
  organiserQR:string;
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
  eventDescription:string;
  eventStatus:string;
}

export enum EVENT_STATUS {
    UPCOMING = 'UPCOMING',
    LIVE = 'LIVE',
    COMPLETED = 'COMPLETED'
}

const eventSchema : Schema = new Schema({

})

export default mongoose.model<IEvent>('EventTable',eventSchema);