import { Request, Response } from "express";
import path from 'path';

//importing services
import { createUserService,loginUserService } from "../services/user.services";


export const uploadImage = (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded uploadImage user controller ' });
    }

    const filePath = path.join('uploads', req.file.filename);
    return res.status(200).json({
        message: 'Image uploaded successfully',
        filePath,
    });
};


export const createUserController = async(req: Request, res:Response) =>{
    try {
       const data =req.body;

       const newUsers = await createUserService(data);

       res.status(200).json({
        newUserDetails:newUsers
       })

    } catch (error : any) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const loginUserController = async(req:Request,res:Response) => {
    try {
        const data = req.body;

        const loginUserData = await loginUserService(data);

        res.status(200).json({
            loginUserDetails : loginUserData
        })
    } catch (error:any) {
         res.status(400).json({
            message: error.message
        })
    }
}