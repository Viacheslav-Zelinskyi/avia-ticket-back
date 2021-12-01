import express from "express";
import dotenv from "dotenv";
import mongooseConnect from "./db";
import routes from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

mongooseConnect().catch((err) => console.log(err));

app.use("/api", routes);

app.listen(port, () => console.log(`Running on port ${port}`));
