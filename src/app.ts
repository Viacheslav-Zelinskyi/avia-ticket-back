import express from "express";
import dotenv from "dotenv";
import mongoose from "./db";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose().catch((err) => console.log(err));


app.get("/", (request, response) => {
  response.send("Hello world!");
});

app.listen(port, () => console.log(`Running on port ${port}`));
