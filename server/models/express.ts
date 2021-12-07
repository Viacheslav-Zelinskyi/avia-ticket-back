import { Request } from "express";
import { ITicket } from "./tickets";

export interface IRequest extends Request {
  query: {
    token?: string;
  };
  user?: IUserReq;
  body: {
    username?: string;
    password?: string;
    id?: string;
    ticket?: ITicket;
  };
}

export interface IUserReq {
  authorized: boolean;
  username?: string;
  error?: string;
  password?: string;
}
