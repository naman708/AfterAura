import { Router } from "express";

//importing controllers
import { uploadImage,createUserController,loginUserController,forgotPasswordController,changePasswordController } from "../controllers/user.controller";

import { authenticateJWT } from "../middleware/auth";
//importing middleware
import upload from "../middleware/multer";


const userRouter = Router();



userRouter.post('/upload',authenticateJWT, upload.single('image'), uploadImage);
userRouter.post('/create',createUserController);
userRouter.post("/login",loginUserController);
userRouter.post("/reset/password",authenticateJWT,forgotPasswordController);
userRouter.post("/change/password",authenticateJWT,changePasswordController);
export default userRouter;