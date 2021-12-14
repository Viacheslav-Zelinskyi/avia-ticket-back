import mongoose from "mongoose";

export interface ITicket {
  from: string;
  fromTimezone: string;
  to: string;
  destinationTimezone: string;
  departureDate: number;
  returnDate?: number;
  passengers: {
    adult: number;
    childrens: number;
    infants: number;
  };
}

export const ticketSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  fromTimezone: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  destinationTimezone: {
    type: String,
    required: true,
  },
  departureDate: {
    type: Number,
    required: true,
  },
  returnDate: {
    type: Number,
    required: false,
  },
  passengers: {
    adult: {
      type: Number,
      required: true,
    },
    childrens: {
      type: Number,
      required: true,
    },
    infants: {
      type: Number,
      required: true,
    },
  },
});
