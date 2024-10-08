import express, { Request, Response } from "express";
import { Repo } from "./repos.entities";
import { Status } from "../status/status.entities";
import { validate } from "class-validator";
import { Lang } from "../langs/lang.entities";
import { In } from "typeorm";

const repoController = express.Router();

repoController.get("/", async (_: any, res: Response) => {
  try {
    const repos = await Repo.find({
      relations: {
        status: true,
        langs: true,
      },
    });
    res.status(200).json(repos);
  } catch (error) {
    console.error("error getting repo:", error);
    res.status(500).json({ error: "An error occured while getting the repo" });
  }
});

repoController.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const repo = await Repo.findOneBy({
      id,
    });
    if (repo) {
      res.status(200).json(repo);
    } else {
      res.status(404).send("Repo not found");
    }
  } catch (error) {
    console.error("error getting repo:", error);
    res.status(500).json({ error: "An error occured while getting the repo" });
  }
});

repoController.post("/post", async (req: Request, res: Response) => {
  try {
    const repo = new Repo();
    repo.id = req.body.id;
    repo.name = req.body.name;
    repo.url = req.body.url;

    const status = await Status.findOneOrFail({
      where: { id: req.body.isPrivate },
    });
    repo.status = status;

    const langs = await Lang.find({
      where: { id: In(req.body.langs.map((l: number) => l)) },
    });
    repo.langs = langs;

    const error = await validate(repo);
    if (error) {
      res.status(422);
    }
    await repo.save();
    res.status(201).json(repo);

  } catch (error) {
    console.error("error adding repo:", error);
    res.status(500).json({ error: "An error occured while adding the repo" });
  }
});

repoController.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const repo = await Repo.findOneBy({ id });
    if (repo) {
      repo.id = req.body.id;
      const status = await Status.findOneOrFail({
        where: { id: req.body.isPrivate },
      });
      repo.status = status;
      repo.name = req.body.name;
      repo.url = req.body.url;
      const error = await validate(repo);
      if (error) {
        res.status(422);
      }
      await repo.save();

      res.status(200).json(repo);
    } else {
      res.status(404).send("Repo not found");
    }
  } catch (error) {
    console.error("Error updating repo:", error);
    res.status(500).json({ error: "An error occured while updating the repo" });
  }
});

repoController.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const repo = await Repo.findOneBy({ id });

    if (repo) {
      await repo.remove();
      res.status(200).send("Repo deleted successfully");
    } else {
      res.status(404).send("Repo not found");
    }
  } catch (error) {
    console.error("Error deleting repo:", error);
    res.status(500).json({ error: "An error occured while deleting the repo" });
  }
});

export default repoController;
