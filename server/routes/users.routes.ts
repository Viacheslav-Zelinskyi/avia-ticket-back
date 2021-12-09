import express, { Response } from "express";
import UsersControllers from "../controllers/users.controllers";
import { IRequest } from "../models/express";
import { SERVER_URL } from "../routes.constants";

const router = express.Router();

router.use(async (req: IRequest, res: Response, next) => {
  next();
});

router.route(SERVER_URL.logout).post(UsersControllers.logOut);

router.route(SERVER_URL.signup).post(UsersControllers.createUser);

router.route(SERVER_URL.login).post(UsersControllers.logIn);

router.route(SERVER_URL.refresh_token).post(UsersControllers.refreshToken);

export default router;
