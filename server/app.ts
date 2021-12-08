import express from "express";
import mongooseConnect from "./db";
import routes from "./routes";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
mongooseConnect().catch((err) => console.log(err));
app.use(cors());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "../client/build")));

app.get(["/", "/tickets", "/mytickets", "/about"], (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "../client/build") });
});

app.use("/api", routes);

export default app;
