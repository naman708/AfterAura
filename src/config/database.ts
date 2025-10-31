import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
if (process.env.NODE_ENV !== 'production') {
  mongoose.set('autoIndex', true); 
}
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log(' MongoDB connected successfully'); 
  } catch (err) {
    console.error(' MongoDB connection error :', err);
    process.exit(1);
  }
};
