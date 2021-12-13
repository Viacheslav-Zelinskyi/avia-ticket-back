import express, { Response } from "express";
import UsersControllers from "../controllers/users.controllers";
import { IRequest, IUserReq } from "../models/express";
import { ROOT_URL, SERVER_URL } from "../routes.constants";
import usersServices from "../services/users.services";

const router = express.Router();

router.use(async (req: IRequest, res: Response, next) => {
  const user = (await usersServices.checkAccessToken(
    req.headers.authentication as string
  )) as IUserReq;
  req.user = { authorized: !user.error, username: user.username };

  next();
});

router
  .route(ROOT_URL)
  .get(UsersControllers.getUserByUsername)
  .patch(UsersControllers.editUser)
  .delete(UsersControllers.deleteUser);

router.route(SERVER_URL.logout).post(UsersControllers.logOut);

router.route(SERVER_URL.signup).post(UsersControllers.createUser);

router.route(SERVER_URL.login).post(UsersControllers.logIn);

router.route(SERVER_URL.refresh_token).post(UsersControllers.refreshToken);

export default router;
