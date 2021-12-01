import express from "express";
import TicketsControllers from "../controllers/tickets.controllers";

const router = express.Router();

router.use(async (req, res, next) => {
  next();
});

router
  .route("/")
  .get(TicketsControllers.getTickets)
  .post(TicketsControllers.saveTicket)
  .patch(TicketsControllers.updateTicket)
  .delete(TicketsControllers.deleteTicket);

export default router;
