import express, { Response } from "express";
import UsersControllers from "../controllers/users.controllers";
import { IRequest } from "../models/express";

const router = express.Router();

router.use(async (req: IRequest, res: Response, next) => {
  next();
});

router.route("/logout").post(UsersControllers.logOut);

router.route("/signup").post(UsersControllers.createUser);

router.route("/login").post(UsersControllers.logIn);

router.route("/refresh-token").post(UsersControllers.refreshToken);

export default router;
