import { createAsyncThunk, createReducer, current } from "@reduxjs/toolkit";
import {
  addTicketFetch,
  deleteTicketFetch,
  getTicketsFetch,
  updateTicketFetch,
} from "../../api";
import { ITicketStore } from "../../models/redux.interfaces";
import { ITicket } from "../../models/ticket.interfaces";

interface IUpdateTicket {
  id: string | null;
  ticket: ITicket;
}

const initialState: Array<ITicketStore> = [];

export const getAllTickets = createAsyncThunk("GET_ALL_TICKETS", async () => {
  return await getTicketsFetch();
});

export const addTicket = createAsyncThunk(
  "ADD_TICKET",
  async (ticket: ITicket) => {
    const response = await addTicketFetch(ticket);

    return { _id: response._id, ...ticket } as ITicketStore;
  }
);

export const updateTicket = createAsyncThunk(
  "UPDATE_TICKET",
  async ({ id, ticket }: IUpdateTicket) => {
    await updateTicketFetch(id, ticket);

    return { _id: id, ...ticket } as ITicketStore;
  }
);

export const deleteTicket = createAsyncThunk(
  "DELETE_TICKET",
  async (id: string) => {
    await deleteTicketFetch(id);

    return { _id: id };
  }
);

export default createReducer(initialState, {
  [getAllTickets.fulfilled.type]: function (state: any, action) {
    state.push(...action.payload);
  },
  [addTicket.fulfilled.type]: function (state: any, action) {
    state.push(action.payload);
  },
  [updateTicket.fulfilled.type]: function (state: any, action) {
    return current(state).map((ticket: ITicketStore) =>
      ticket._id === action.payload._id ? action.payload : ticket
    );
  },
  [deleteTicket.fulfilled.type]: function (state: any, action) {
    return current(state).filter(
      (ticket: ITicketStore) => ticket._id !== action.payload._id
    );
  },
});
