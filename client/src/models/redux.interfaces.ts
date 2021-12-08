import { IPeopleCounter } from "./ticket.interfaces";

export interface IUser {
  authorized: boolean;
  username: string
}

export interface ITicketStore {
  from?: string;
  fromTimezone?: string;
  to?: string;
  destinationTimezone?: string;
  departureDate?: number;
  returnDate?: number;
  passengers?: IPeopleCounter;
  _id: string;
}

export type AllTicketsStore = Array<ITicketStore>;

export interface IStore {
  user: IUser;
  ticket: ITicketStore;
  allTickets: AllTicketsStore;
}
