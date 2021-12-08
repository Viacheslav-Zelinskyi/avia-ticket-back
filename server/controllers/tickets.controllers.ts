import { Response } from "express";
import { IRequest } from "../models/express";
import TicketsServices from "../services/tickets.services";

class TicketsController {
  async getTickets(req: IRequest, res: Response) {
    return res.status(200).send(await TicketsServices.getTickets());
  }

  async saveTicket(req: IRequest, res: Response) {
    return res
      .status(200)
      .send(await TicketsServices.saveTickets(req.body.ticket));
  }

  async updateTicket(req: IRequest, res: Response) {
    return res
      .status(200)
      .send(await TicketsServices.updateTickets(req.body.id, req.body.ticket));
  }

  async deleteTicket(req: IRequest, res: Response) {
    return res
      .status(200)
      .send(await TicketsServices.deleteTickets(req.body.id));
  }
}

export default new TicketsController();
