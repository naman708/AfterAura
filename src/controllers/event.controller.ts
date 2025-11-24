import { Request, Response } from "express";


//importing services 
import { createEventService ,searchEventService ,getAllEventService} from "../services/event.services";


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


export const searchEventController = async(req:Request,res:Response) => {
    try {
        const data = req.query ;

        const  searchEventDetails =  await searchEventService(data);
        res.status(201).json({
             searchEventDetails
        })
    } catch (error:any) {
          res.status(400).json({
            message: error.message 
        });
    }
}
export const getAllEventController = async(req:Request,res:Response) => {
    try {
        const data = req.query ;

        const  getAllEventDetails =  await getAllEventService(data);
        res.status(201).json({
              getAllEventDetails
        })
    } catch (error:any) {
          res.status(400).json({
            message: error.message 
        });
    }
}