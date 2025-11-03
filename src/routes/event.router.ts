import { Router } from "express";

//importing controllers
import { createEventController } from "../controllers/event.controller";


const eventRouter = Router();




eventRouter.post('/create',createEventController);

export default eventRouter;