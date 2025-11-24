import { Router } from "express";

//importing controllers
import { createEventController , searchEventController , getAllEventController } from "../controllers/event.controller";


const eventRouter = Router();




eventRouter.post('/create',createEventController);
eventRouter.get('/search',searchEventController);
eventRouter.get('/events',getAllEventController);
export default eventRouter;