import userModel from "../models/user.model";



export const getUnVerifiedUsers = async (userId:string) => {
    try {
        const fetchUser = await userModel.findOne({userId,isVerified:false});
        if(!fetchUser){
          return  {success :false,message:"user not found"};
        }
        return fetchUser;
    } catch (error:any) {
        throw new Error(`Error getUnVerifiedUsers: ${error.message}`);
    }
}

export const registerOrganiser = async (userId:string) => {
    try {
        const fetchUser = await userModel.findOne({userId,isVerified:true});
        if(!fetchUser){
            return {success :false,message:"user not found or either user is not verified"};
        }
        fetchUser.isUserOrganiser = true;
        fetchUser.save();
        return fetchUser
    } catch (error:any) {
        throw new Error(`Error registerOrganiser: ${error.message}`);

    }
}

export const approveUserToOrganiser = async(userId:string) => {
    try {
        const fetchUser = await userModel.findOne({userId});
         if(!fetchUser){
            return {success :false,message:"user not found "};
        }
        fetchUser.isVerified = true;
        fetchUser.save();
        return fetchUser;
    } catch (error:any) {
        throw new Error(`Error approveUserToOrganiser: ${error.message}`);

    }
}