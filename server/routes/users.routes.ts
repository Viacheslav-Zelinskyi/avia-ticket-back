import express, { Response } from "express";
import UsersControllers from "../controllers/users.controllers";
import { IRequest } from "../models/express";

const router = express.Router();

router.use(async (req: IRequest, res: Response, next) => {
  next();
});

router.route("/signup").post(UsersControllers.createUser);

router.route("/login").post(UsersControllers.logIn);

export default router;
