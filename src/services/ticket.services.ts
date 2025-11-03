import dotenv from 'dotenv';
dotenv.config();


//importing models
import ticketModel from '../models/ticket.model';
import eventModel from '../models/event.model';
import userModel from '../models/user.model';



export const bookTicketService = async(eventId:string,userId:string) => {
    try {
        const fetchEvent = await eventModel.findOne({eventId});
        const fetchuser = await userModel.findOne({userId});

        if(!fetchEvent){
            return {message:'event doesnot exist'};
        }
        if(!fetchuser){
            return {message:'user doesnot exist'};
        }
        let ticketData = {
            eventId,
            userId,
            eventName:fetchEvent.eventName,
            venue:fetchEvent.venue,
            startTime:fetchEvent.startTime,
            endTime:fetchEvent.endTime,
            price:fetchEvent.ticketPrice,
            userName:fetchuser.userName,
            userEmail:fetchuser.userEmail
        }

        const generateUserTicket = await ticketModel.create(ticketData);

        const attendeeData = {
          name: fetchuser.userName,
          email: fetchuser.userEmail,
          phone: fetchuser.userMobileNumber,
        };
        const updateEvent = await addAttendee(eventId, attendeeData );
        return {generateUserTicket,updateEvent};

    } catch (error:any) {
         throw new Error(`Error bookTicketService : ${error.message}`);
    }

};


const addAttendee = async (
  eventId: string,
  attendee: { name: string; email: string; phone: number }
) => {
  try {
    const updatedEvent = await eventModel.findOneAndUpdate(
      { eventId },
      { $addToSet: { attendees: attendee } }, 
      { new: true }
    );

    console.log("✅ Attendee added:", updatedEvent?.attendees);
    return updatedEvent;
  } catch (error) {
    console.error("❌ Error adding attendee:", error);
  }
};
