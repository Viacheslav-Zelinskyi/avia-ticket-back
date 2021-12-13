import mongoose from "mongoose";

export interface IUser {
  id?: string;
  username: string;
  firstName?: string;
  secondName?: string;
  phone?: string;
  password: string;
  img?: string;
}

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  secondName: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});
