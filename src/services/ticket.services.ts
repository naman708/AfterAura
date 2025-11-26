import dotenv from 'dotenv';
dotenv.config();


//importing models
import ticketModel from '../models/ticket.model';
import eventModel from '../models/event.model';
import userModel from '../models/user.model';

//importing email service
import { emailService } from './emailService/email.service';


export const bookTicketService = async(eventId:string,userId:string,ticketsQuantity:number) => {
    try {
        const fetchEvent = await eventModel.findOne({eventId});
        const fetchuser = await userModel.findOne({userId});

        if(!fetchEvent){
            return {message:'event doesnot exist'};
        }
        if(!fetchuser){
            return {message:'user doesnot exist'};
        }
        if(ticketsQuantity>fetchEvent.totalTickets){
            return {message:'invalid ticket quantity'};
        }
        const totalTicketPrice = ticketsQuantity * fetchEvent.ticketPrice
        let ticketData = {
            eventId,
            userId,
            eventName:fetchEvent.eventName,
            venue:fetchEvent.venue,
            startTime:fetchEvent.startTime,
            endTime:fetchEvent.endTime,
            price:totalTicketPrice,
            userName:fetchuser.userName,
            userEmail:fetchuser.userEmail,
            ticketsQuantity
        }

        const generateUserTicket = await ticketModel.create(ticketData);

        const attendeeData = {
          name: fetchuser.userName,
          email: fetchuser.userEmail,
          phone: fetchuser.userMobileNumber,
          ticketQuantity:ticketsQuantity
        };
        const updateEvent = await addAttendee(eventId, attendeeData );
        emailService.sendTicketBooking(fetchuser.userEmail,{
             name:  fetchuser.userName,
             event: fetchEvent.eventName,
             date: fetchEvent.date as unknown as string,
             bookingId: generateUserTicket.ticketId
        })
        return {generateUserTicket,updateEvent};

      
    } catch (error:any) {
         throw new Error(`Error bookTicketService : ${error.message}`);
    }

};


const addAttendee = async (
  eventId: string,
  attendee: { name: string; email: string; phone: number ,ticketQuantity:number}
) => {
  try {
    const updatedEvent = await eventModel.findOneAndUpdate(
      { eventId },
      { 
        $addToSet: { attendees: attendee },
        $inc: { totalTickets: -attendee.ticketQuantity }
      }, 
      { new: true }
    );

    console.log("✅ Attendee added:", updatedEvent?.attendees);
    return updatedEvent;
  } catch (error) {
    console.error("❌ Error adding attendee:", error);
  }
};
