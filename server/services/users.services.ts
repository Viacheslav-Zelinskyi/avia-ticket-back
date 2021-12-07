import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../db";
import { IUser } from "../models/users";

const saltRounds = process.env.SALT_ROUNDS || 10;

class UserService {
  hashPassword(password: string) {
    return new Promise((res, rej) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) rej(err);

        res(hash);
      });
    });
  }

  checkPassword(password: string, hash: string) {
    return new Promise((res, rej) => {
      bcrypt.compare(password, hash, (err, result) => {
        if (err) rej(err);

        res(result);
      });
    });
  }

  generateAccessToken(username: string) {
    return new Promise((res, rej) => {
      const payload = { username: username };
      const tokenSecret = process.env.TOKEN_SECRET;
      const options = {
        expiresIn: Number(process.env.TOKEN_LIFE),
      };

      res(jwt.sign(payload, tokenSecret, options));
    });
  }

  generateRefreshToken(username: string) {
    return new Promise((res, rej) => {
      const payload = { username: username };
      const tokenSecret = process.env.TOKEN_REFRESH_SECRET;
      const options = {
        expiresIn: Number(process.env.TOKEN_REFRESH_LIFE),
      };

      res(jwt.sign(payload, tokenSecret, options));
    });
  }

  checkAccessToken(token: string) {
    return new Promise((res, rej) => {
      const tokenSecret = process.env.TOKEN_SECRET;

      jwt.verify(token, tokenSecret, (err, user) => {
        if (err) res({ error: "Wrong token" });

        res(user);
      });
    });
  }

  checkRefreshToken(token: string) {
    return new Promise((res, rej) => {
      const tokenSecret = process.env.TOKEN_REFRESH_SECRET;

      jwt.verify(token, tokenSecret, (err, user) => {
        if (err) res({ error: "Wrong token" });

        res(user);
      });
    });
  }

  getUserByUsername(username: string) {
    return new Promise((res, rej) => {
      Users.find({ username: username }).exec((err, user) => {
        if (err) rej(err);

        res(user);
      });
    });
  }

  createUser(user: IUser) {
    return new Promise((res, rej) => {
      Users.create(user, (err, doc) => {
        if (err) rej(err);

        res(doc);
      });
    });
  }
}

export default new UserService();
