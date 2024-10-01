import express, { Request, Response } from "express";
// import Joi from "joi";

import { Repo } from "../entities/repos";

// import repos from "../../data/repos.json";
// import type { Repo } from "./repo.type";

// let myRepos: Array<Repo> = repos;

const repoController = express.Router();

// const schema = Joi.object({
//   id: Joi.string().required(),
//   name: Joi.string().required(),
//   url: Joi.string().required(),
//   isPrivate: Joi.number().min(1).max(2).required(),
// });

// const validateRepo = (req: Request, res: Response, next: NextFunction) => {
//   const { error } = schema.validate(req.body);

//   if (error == null) {
//     next();
//   } else {
//     res.status(422).json(error);
//   }
// };

// repoController.get("/", (req: Request, res: Response) => {
//   const { status } = req.query;
//   const result =
//     status !== undefined
//       ? myRepos.filter((repo: Repo) => repo.isPrivate === +status)
//       : myRepos;
//   res.status(200).json(result);
// });

repoController.get("/repo", async (_: Request, res: Response) => {
  const repos = await Repo.find();
  res.send(repos);
 });
 
repoController.get("/repo/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const repo = await Repo.findOneBy({ id });
  res.send(repo);
 });
 

// repoController.get("/:id", (req: Request, res: Response) => {
//   const repo = repos.find((rep) => rep.id === req.params.id) as Repo;
//   if (repo) {
//     res.status(200).json(repo);
//   } else {
//     res.sendStatus(404);
//   }
// });

// repoController.post("/", validateRepo, (req: Request, res: Response) => {
//   repos.push(req.body);
//   res.status(201).json(req.body);
// });

repoController.post("/post", async (req: Request, res: Response) => {
  try {
  const repo = new Repo();
  repo.id = req.body.id;
  repo.isPrivate = req.body.isPrivate;
  repo.name = req.body.name;
  repo.url = req.body.url;
 
  await repo.save();
 
  res.status(201).json(repo);
  } catch (error) {
    console.error("error adding repo:", error);
    res.status(500).json({error: "An error occured while adding the repo"});
  }
 });

 repoController.put("/repo/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const repo = await Repo.findOneBy({ id })
    if (repo) {
      repo.id = req.body.id;
      repo.isPrivate = req.body.isPrivate;
      repo.name = req.body.name;
      repo.url = req.body.url;
  
      await repo.save();
      
      res.status(200).json(repo);
    } else {
      res.status(404).send("Repo not found");
    }
  } catch (error) {
    console.error("Error updating repo:", error);
    res.status(500).json({error : "An error occured while updating the repo"});
  }
 });
 
// repoController.delete("/:id", (req: Request, res: Response) => {
//   myRepos = myRepos.filter((repo: Repo) => repo.id !== req.params.id);
//   res.sendStatus(204);
// });

repoController.delete("/repo/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const repo = await Repo.findOneBy({ id });

    if (repo) {
      await repo.remove();
      res.status(200).send("Repo deleted successfully");
    } else {
      res.status(404).send("Repo not found");
    }
  } catch (error) {
    console.error("Error deleting repo:", error);
    res.status(500).json({error : "An error occured while deleting the repo"});
  }
 });
 
export default repoController;
