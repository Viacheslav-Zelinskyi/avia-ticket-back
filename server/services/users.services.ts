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

  getUserByUsername(username: string, withoutPassword = false) {
    return new Promise((res, rej) => {
      Users.find(
        { username: username },
        withoutPassword ? { password: 0 } : {}
      ).exec((err, user) => {
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

  editUser(username: string, user: IUser) {
    return new Promise((res, rej) => {
      Users.updateOne(
        { username: username },
        {
          username: user.username,
          firstName: user.firstName,
          secondName: user.secondName,
          phone: user.phone,
          img: user.img,
        } as any,
        (err) => {
          if (err) res("Error");

          res("Success");
        }
      );
    });
  }

  deleteUser(username: string) {
    return new Promise((res, rej) => {
      Users.deleteOne({ username: username }, (err, doc) => {
        if (err) res("Error");

        res("Success");
      });
    });
  }
}

export default new UserService();
