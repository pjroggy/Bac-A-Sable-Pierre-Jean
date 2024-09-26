import express from "express";
import router from "./router";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
  console.log("serveur is listening on http://localhost:3000");
});
