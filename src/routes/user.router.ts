import { Router } from "express";

//importing controllers
import { uploadImage,createUserController,loginUserController } from "../controllers/user.controller";

//importing middleware
import upload from "../middleware/multer";


const userRouter = Router();



userRouter.post('/upload', upload.single('image'), uploadImage);
userRouter.post('/create',createUserController);
userRouter.post("/login",loginUserController);

export default userRouter;