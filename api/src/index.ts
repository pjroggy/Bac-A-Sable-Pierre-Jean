import express from "express";
import router from "./router";
import "reflect-metadata";
import { AppDataSource } from "./data-source";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", router);

app.listen(port, async() => {
  await AppDataSource.initialize();
  console.log("serveur is listening on http://localhost:3000");
});

 