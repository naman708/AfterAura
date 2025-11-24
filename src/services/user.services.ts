import dotenv from 'dotenv';
dotenv.config();

// importing models
import userModel from '../models/user.model';

//importing libraries
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//importing services
import { emailService } from './emailService/email.service';


export const createUserService = async(data:any) => {
    try {
        const { userEmail,userName,userMobileNumber,kycDocumentFront,kycDocumentBack,OrganiserUPI,OrganiserQR,userAddress} = data;
        const existingUser = await userModel.findOne({ userEmail });

        if(existingUser){
            return {message:'user already registered createUserService '}
        }
           
        const hashedPassword = await bcrypt.hash(data.password, 10);

        let userData = {
            userEmail,
            userName,
            userMobileNumber,
            kycDocumentFront,
            kycDocumentBack,
            OrganiserUPI,
            OrganiserQR,
            userAddress,
            password:hashedPassword
        }

        const newUser = await userModel.create(userData);
        // emailService.sendRegistrationEmail(newUser.userEmail,{
        //     name:newUser.userName
        // });
        return newUser;

    } catch (error:any) {
        throw new Error(`Error createUserService : ${error.message}`);
    }
}

export const loginUserService = async(data:any)=>{
    try {
        const {userEmail,password}=data;
        const existingUser = await userModel.findOne({
           userEmail
        })
        if(!existingUser){
            return {success :false,message:"user not found"};
        }
          const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
           return {success :false,message:"incorrect password"}
        }

         const token = jwt.sign(
            { userId: existingUser.userId, userEmail: existingUser.userEmail, isUserOrganiser: existingUser.isUserOrganiser },
            process.env.JWT_SECRET as string,
            { expiresIn: '24h' }
        );
        return { existingUser, token };
    } catch (error:any) {
      throw new Error(`Error loginUserService : ${error.message}`);
    }
}

