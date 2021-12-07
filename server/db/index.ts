import mongoose from "mongoose";
import { ticketSchema } from "../models/tickets";
import { userSchema } from "../models/users";

export const Tickets = mongoose.model("tickets", ticketSchema);
export const Users = mongoose.model("users", userSchema);

export default async function () {
  return await mongoose.connect(process.env.DB_URL);
}
