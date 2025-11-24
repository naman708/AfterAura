import { Router } from "express";

//importing controllers
import { getUnVerifiredUsersController,registerOrganiserController,approveUsersController } from "../controllers/admin.controller";

const adminRouter = Router();




adminRouter.get('/get/UnVerified/:userId',getUnVerifiredUsersController);
adminRouter.get('/register/organiser/:userId',registerOrganiserController);
adminRouter.get('/approve/user/:userId',approveUsersController);


export default adminRouter;