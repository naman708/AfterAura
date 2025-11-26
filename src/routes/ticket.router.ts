import { Router } from "express";

//import controllers
import { bookTicketControllers } from "../controllers/ticket.controller";
import { authenticateJWT } from "../middleware/auth";

const ticketRouter = Router();




ticketRouter.post('/book',authenticateJWT, bookTicketControllers);

export default ticketRouter;