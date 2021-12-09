import express from "express";
import dotenv from "dotenv";
import mongooseConnect from "./db";
import routes from "./routes";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { BASE_URL, CLIENT_URL } from "./routes.constants";

dotenv.config();

const app = express();

app.use(express.json());
mongooseConnect().catch((err) => console.log(err));
app.use(cors());
app.use(cookieParser());

app.use(
  CLIENT_URL.home,
  express.static(path.join(__dirname, "../client/build"))
);

app.get(
  [CLIENT_URL.home, CLIENT_URL.tickets, CLIENT_URL.myTickets, CLIENT_URL.about],
  (req, res) => {
    res.sendFile("index.html", {
      root: path.join(__dirname, "../client/build"),
    });
  }
);

app.use(BASE_URL, routes);

export default app;
