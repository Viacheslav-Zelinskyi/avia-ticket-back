import { Response } from "express";
import { IRequest, IUserReq } from "../models/express";
import { IUser } from "../models/users";
import UsersServices from "../services/users.services";

class UserController {
  async createUser(req: IRequest, res: Response) {
    const users = (await UsersServices.getUserByUsername(
      req.body.username
    )) as Array<Object>;
    const hash = (await UsersServices.hashPassword(
      req.body.password
    )) as string;

    const user: IUser = { username: req.body.username, password: hash };

    if (users.length > 0) return res.send({ error: "User exist" });

    await UsersServices.createUser(user);

    const token = (await UsersServices.generateAccessToken(
      user.username
    )) as string;

    const refreshToken = (await UsersServices.generateRefreshToken(
      user.username
    )) as string;

    let options = {
      maxAge: 1000 * Number(process.env.TOKEN_REFRESH_LIFE),
      httpOnly: true,
      secure: false,
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .send({ token: token });
  }

  async logIn(req: IRequest, res: Response) {
    const users = (await UsersServices.getUserByUsername(
      req.body.username
    )) as Array<IUserReq>;

    if (users.length === 0) return res.send({ error: "User doesn't exist" });

    const isPasswordCorrect = (await UsersServices.checkPassword(
      req.body.password,
      users[0].password
    )) as boolean;

    if (!isPasswordCorrect) return res.send({ error: "Wrong password" });

    const token = (await UsersServices.generateAccessToken(
      users[0].username
    )) as string;
    const refreshToken = (await UsersServices.generateRefreshToken(
      users[0].username
    )) as string;

    let options = {
      maxAge: 1000 * Number(process.env.TOKEN_REFRESH_LIFE),
      httpOnly: true,
      secure: false,
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .send({ token: token });
  }
}

export default new UserController();
