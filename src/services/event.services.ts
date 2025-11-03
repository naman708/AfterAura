import dotenv from 'dotenv';
dotenv.config();

//importing models
import eventModel from '../models/event.model';
import userModel from '../models/user.model';



export const createEventService = async(data:any) =>{
    try {
        const {eventName,organiserId,organiserUPI,venue,location,date,startTime,endTime,totalTickets,ticketPrice,eventDescription,organiserQR,city} = data;
        const existingEvent = await eventModel.findOne({eventName});
        const fetchOrganiserDetails = await userModel.findOne({organiserId});
        if(!fetchOrganiserDetails){
            return {message:'Invalid organiser id Organiser does not exist createEventService'};
        }
        if(!fetchOrganiserDetails.isUserOrganiser){
            return {message:'please first registered as organiser'};
        }
        if(existingEvent){
            return {message : 'event already exists with this name createEventService'}
        }
        let eventData = {
            eventName,
            organiserId,
            organiserUPI,
            venue,
            location,
            date,
            startTime,
            endTime,
            totalTickets,
            ticketPrice,
            isActive : true,
            eventDescription,
            organiserQR,
            city
        }

        const createEvent = await eventModel.create(eventData);


        return createEvent;

    } catch (error:any) {
           throw new Error(`Error createEventService : ${error.message}`);
    }
}


