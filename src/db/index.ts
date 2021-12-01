import mongoose from "mongoose";
import { ticketSchema } from "../models/tickets";

export const Tickets = mongoose.model("tickets", ticketSchema);

export default async function () {
  return await mongoose.connect(process.env.DB_URL);
}