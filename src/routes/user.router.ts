import { Router } from "express";

//importing controllers
import { uploadImage,createUserController } from "../controllers/user.controller";

//importing middleware
import upload from "../middleware/multer";


const userRouter = Router();



userRouter.post('/upload', upload.single('image'), uploadImage);
userRouter.post('/create',createUserController);

export default userRouter;