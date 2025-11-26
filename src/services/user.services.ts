import dotenv from 'dotenv';
dotenv.config();

// importing models
import userModel from '../models/user.model';

//importing libraries
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from "crypto";


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
        emailService.sendRegistrationEmail(newUser.userEmail,{
            name:newUser.userName,
            loginLink: process.env.LOGIN_LINK as string
        });
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

export const forgotPassword = async(userEmail:string) =>{
    try {
       const fetchuser = await userModel.findOne({userEmail});

       if(!fetchuser){
        return {success:false,message : 'user not found'};
       }
       const generateOtp = generateSecureOTP();
       const hashedPassword = await bcrypt.hash(generateOtp, 10);

       fetchuser.password = hashedPassword;
       fetchuser.save();
       emailService.sendForgotPassword(userEmail,{
        name:fetchuser.userName,
        otp:generateOtp
       })
       return {success:true,message:'password has been sent to user email'}

    } catch (error:any) {
        throw new Error(`Error forgotPasswordService : ${error.message}`);

    }
}


function generateSecureOTP(length = 6) {
  let otp = crypto.randomInt(0, Math.pow(10, length)).toString();
  return otp.padStart(length, "0");
}


export const changePassword = async(password:string,userId:string) => {
    try {
        const fetchUser = await userModel.findOne({userId});
        if(!fetchUser){
            return{success:false,message:'user not found '}
        }
       const hashedPassword = await bcrypt.hash(password, 10);

       fetchUser.password = hashedPassword;
       fetchUser.save();

       return fetchUser;
    } catch (error:any) {
      throw new Error(`Error changePasswordService : ${error.message}`);

    }
}