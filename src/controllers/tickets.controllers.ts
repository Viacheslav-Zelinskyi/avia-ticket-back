import TicketsServices from "../services/tickets.services";

class TicketsController {
  async getTickets(req, res) {
    return res.send(await TicketsServices.getTickets());
  }

  async saveTicket(req, res) {
    return res.send(await TicketsServices.saveTickets(req.body.ticket));
  }

  async updateTicket(req, res) {
    return res.send(
      await TicketsServices.updateTickets(req.body.id, req.body.ticket)
    );
  }

  async deleteTicket(req, res) {
    return res.send(await TicketsServices.deleteTickets(req.body.id));
  }
}

export default new TicketsController();
