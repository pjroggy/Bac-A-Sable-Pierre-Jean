import express from "express";
import router from "./router";
import { AppDataSource } from "./data-source";
import "reflect-metadata";
import cors from "cors";

const app = express();
const { PORT } = process.env;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use("/api", router);

app.listen(PORT, async () => {
  await AppDataSource.initialize();
  console.log(`serveur is listening on http://localhost:${PORT}`);
});
