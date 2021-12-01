import { Tickets } from "../db";
import { ITicket } from "../models/tickets";

class TicketsService {
  getTickets() {
    return new Promise((res, rej) => {
      Tickets.find().exec((err, tickets) => {
        if (err) rej(err);

        res(tickets);
      });
    });
  }

  saveTickets(ticket: ITicket) {
    return new Promise((res, rej) => {
      Tickets.create(ticket, (err, doc) => {
        if (err) rej(err);

        res("Saved tickets: " + doc);
      });
    });
  }

  updateTickets(id: string, ticket: ITicket) {
    return new Promise((res, rej) => {
      Tickets.updateOne({ _id: id }, ticket, (err, result) => {
        if (err) rej(err);

        res(result);
      });
    });
  }

  deleteTickets(id: string) {
    return new Promise((res, rej) => {
      Tickets.deleteOne({ _id: id }, (err, result) => {
        if (err) rej(err);

        res(result);
      });
    });
  }
}

export default new TicketsService();
