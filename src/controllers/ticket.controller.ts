import { Request, Response } from "express";

//import services
import { bookTicketService } from "../services/ticket.services";



export const bookTicketControllers = async(req:Request,res:Response) => {
    try {
        const {eventId,userId} = req.body;
        const tickets = await bookTicketService(eventId,userId);

        res.status(201).json({
            tickets
        })
    } catch (error:any) {
        res.status(400).json({
            message : error.message 
        })
    }
}