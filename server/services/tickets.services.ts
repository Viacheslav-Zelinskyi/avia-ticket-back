import { Tickets } from "../db";
import { ITicket } from "../models/tickets";

class TicketsService {
  getTickets(username: string) {
    return new Promise((res, rej) => {
      Tickets.find({ username: username }).exec((err, tickets) => {
        if (err) rej(err);

        res(tickets);
      });
    });
  }

  saveTickets(username: string, ticket: ITicket) {
    return new Promise((res, rej) => {
      Tickets.create({ username: username, ...ticket }, (err, doc) => {
        if (err) rej(err);

        res({ _id: doc.id });
      });
    });
  }

  updateTickets(username: string, id: string, ticket: any) {
    return new Promise((res, rej) => {
      Tickets.updateOne(
        { _id: id, username: username },
        ticket,
        (err, result) => {
          if (err) rej(err);

          res(result);
        }
      );
    });
  }

  deleteTickets(username: string, id: string) {
    return new Promise((res, rej) => {
      Tickets.deleteOne({ _id: id, username: username }, (err, result) => {
        if (err) rej(err);

        res(result);
      });
    });
  }
}

export default new TicketsService();
