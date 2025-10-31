import mongoose ,{Schema,Document} from "mongoose";

export interface ITicket extends Document {
    ticketId:string;
    eventId:string;
    userId:string;
    eventName:string;
    venue:string;
    startTime:Date;
    endTime:Date;
    price:number;
}

const ticketSchema : Schema = new Schema({

})


export default mongoose.model<ITicket>('TickertTable',ticketSchema);