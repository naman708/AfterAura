import dotenv from 'dotenv';
dotenv.config();

// importing models
import userModel from '../models/user.model';

//importing libraries
import bcrypt from 'bcrypt';


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

        return newUser;

    } catch (error:any) {
        throw new Error(`Error createUserService : ${error.message}`);
    }
}



