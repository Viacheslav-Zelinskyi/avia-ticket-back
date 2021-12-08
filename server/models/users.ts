import mongoose from "mongoose";

export interface IUser {
  id?: string;
  username: string;
  password: string;
}

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
