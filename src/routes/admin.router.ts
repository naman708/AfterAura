import { Router } from "express";

//importing controllers
import { getUnVerifiredUsersController,registerOrganiserController,approveUsersController } from "../controllers/admin.controller";
import { authenticateJWT } from "../middleware/auth";

const adminRouter = Router();




adminRouter.get('/get/UnVerified/:userId',authenticateJWT,getUnVerifiredUsersController);
adminRouter.get('/register/organiser/:userId',authenticateJWT,registerOrganiserController);
adminRouter.get('/approve/user/:userId',authenticateJWT,approveUsersController);


export default adminRouter;