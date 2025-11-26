import { Router } from "express";

//importing controllers
import { createEventController , searchEventController , getAllEventController } from "../controllers/event.controller";
import { authenticateJWT } from "../middleware/auth";
const eventRouter = Router();




eventRouter.post('/create',authenticateJWT,createEventController);
eventRouter.get('/search',authenticateJWT,searchEventController);
eventRouter.get('/events',authenticateJWT,getAllEventController);
export default eventRouter;