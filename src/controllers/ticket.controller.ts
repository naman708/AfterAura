import { Request, Response } from "express";

//import services
import { bookTicketService } from "../services/ticket.services";



export const bookTicketControllers = async(req:Request,res:Response) => {
    try {
        const {eventId,userId,ticketsQuantity} = req.body;
        const tickets = await bookTicketService(eventId,userId,ticketsQuantity);

        res.status(201).json({
            tickets
        })
    } catch (error:any) {
        res.status(400).json({
            message : error.message 
        })
    }
}