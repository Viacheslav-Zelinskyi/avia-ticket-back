import { Response } from "express";
import { IRequest } from "../models/express";
import TicketsServices from "../services/tickets.services";

class TicketsController {
  async getTickets(req: IRequest, res: Response) {
    return res.send(await TicketsServices.getTickets(req.user.username));
  }

  async saveTicket(req: IRequest, res: Response) {
    return res.send(
      await TicketsServices.saveTickets(req.user.username, req.body.ticket)
    );
  }

  async updateTicket(req: IRequest, res: Response) {
    return res.send(
      await TicketsServices.updateTickets(
        req.user.username,
        req.body.id,
        req.body.ticket
      )
    );
  }

  async deleteTicket(req: IRequest, res: Response) {
    return res.send(
      await TicketsServices.deleteTickets(req.user.username, req.body.id)
    );
  }
}

export default new TicketsController();
