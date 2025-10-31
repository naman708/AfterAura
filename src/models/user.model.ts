import mongoose,{Schema,Document} from "mongoose";
import {v4 as uuidv4} from 'uuid';


export interface IUser extends Document {
userName:string;
userEmail:string;
userMobileNumber:number;
isUserOrganiser:boolean;
kycDocumentFront:string;
kycDocumentBack:string;
OrganiserUPI:string;
OrganiserQR:string;
userAddress:string;
password:string;
userId:string;
organiserId:string;
}


const userSchema:Schema = new Schema ({

})



export default mongoose.model<IUser>('UserTable', userSchema);
