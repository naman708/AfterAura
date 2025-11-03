import { Request, Response } from "express";


//importing services 
import { createEventService } from "../services/event.services";



export const createEventController = async(req:Request,res:Response) => {
    try {
        const data = req.body;

        const eventCreationDetails =  await createEventService(data);
        res.status(201).json({
            eventCreationDetails
        })
    } catch (error:any) {
          res.status(400).json({
            message: error.message 
        });
    }
}