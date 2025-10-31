import mongoose,{Schema,Document} from "mongoose";


export interface IPayment extends Document {

}

const paymentSchema : Schema = new Schema ({

})



export default mongoose.model<IPayment>('PaymentTable',paymentSchema);