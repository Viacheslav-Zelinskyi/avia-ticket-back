import express from "express";
import dotenv  from "dotenv"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (request, response) => {
  response.send("Hello world!");
});

app.listen(port, () => console.log(`Running on port ${port}`));
