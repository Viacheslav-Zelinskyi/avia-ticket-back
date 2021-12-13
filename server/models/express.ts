import { Request } from "express";
import { ITicket } from "./tickets";
import { IUser } from "./users";

export interface IRequest extends Request {
  user?: IUserReq;
  body: {
    id?: string;
    ticket?: ITicket;
    user?: IUser;
  };
}

export interface IUserReq {
  authorized: boolean;
  username?: string;
  error?: string;
  password?: string;
}
