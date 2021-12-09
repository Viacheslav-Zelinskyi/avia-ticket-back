import express, { Response } from "express";
import UsersControllers from "../controllers/users.controllers";
import { IRequest } from "../models/express";
import {
  LOGIN_URL,
  LOGOUT_URL,
  REFERSH_TOKEN_URL,
  SIGNUP_URL,
} from "../routes.constants";

const router = express.Router();

router.use(async (req: IRequest, res: Response, next) => {
  next();
});

router.route(LOGOUT_URL).post(UsersControllers.logOut);

router.route(SIGNUP_URL).post(UsersControllers.createUser);

router.route(LOGIN_URL).post(UsersControllers.logIn);

router.route(REFERSH_TOKEN_URL).post(UsersControllers.refreshToken);

export default router;
