import express, { Response } from "express";
import TicketsControllers from "../controllers/tickets.controllers";
import { IRequest, IUserReq } from "../models/express";
import UsersServices from "../services/users.services";

const router = express.Router();

router.use(async (req: IRequest, res: Response, next) => {
  const user = (await UsersServices.checkAccessToken(
    req.headers.authentication as string
  )) as IUserReq;
  req.user = { authorized: !user.error, username: user.username };

  next();
});

router
  .route("/")
  .get(TicketsControllers.getTickets)
  .post(TicketsControllers.saveTicket)
  .patch(TicketsControllers.updateTicket)
  .delete(TicketsControllers.deleteTicket);

export default router;
