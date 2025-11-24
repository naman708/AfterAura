import { Request, Response } from "express";

//importing services
import { getUnVerifiedUsers , registerOrganiser ,approveUserToOrganiser} from "../services/admin.services";



export const getUnVerifiredUsersController = async(req:Request,res:Response) => {
    try {
        const userId = req.params.userId;
        if(!userId){
              res.status(400).json({
              success :false,message:"invalid params userid not found"
        })
        }
        const getUnVerifiedUsersDetails =  await getUnVerifiedUsers(userId);
        res.status(201).json({
            getUnVerifiedUsersDetails
        })
    } catch (error:any) {
          res.status(400).json({
            message: error.message 
        });
    }
}

export const registerOrganiserController = async(req:Request,res:Response) => {
    try {
        const userId = req.params.userId;
        if(!userId){
              res.status(400).json({
              success :false,message:"invalid params userid not found"
        })
        }
        const registerOrganiserDetails =  await registerOrganiser(userId);
        res.status(201).json({
            registerOrganiserDetails
        })
    } catch (error:any) {
          res.status(400).json({
            message: error.message 
        });
    }
}


export const approveUsersController = async (req:Request,res:Response) => {
    try {
        const userId = req.params.userId;
        if(!userId){
              res.status(400).json({
              success :false,message:"invalid params userid not found"
        })
        }
        const approveUserToOrganiserDetails =  await approveUserToOrganiser(userId);
        res.status(201).json({
            approveUserToOrganiserDetails
        })
    } catch (error:any) {
         res.status(400).json({
            message: error.message 
        });
    }

}