import { Router } from "express";

//import controllers
import { bookTicketControllers } from "../controllers/ticket.controller";

const ticketRouter = Router();




ticketRouter.post('/book', bookTicketControllers);

export default ticketRouter;