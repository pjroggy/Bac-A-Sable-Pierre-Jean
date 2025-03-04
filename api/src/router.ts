import express from "express";
import { Response } from "express";
import repoControllers from "./repos/repos.controllers";
import langsControllers from "./langs/langs.controllers";
import statusControllers from "./status/status.controllers";

const router = express.Router();

router.get("/", (_: any, res: Response) => {
  console.log(res);
  res.send("coucou");
});

router.use("/repos", repoControllers);
router.use("/langs", langsControllers);
router.use("/status", statusControllers);

export default router;
