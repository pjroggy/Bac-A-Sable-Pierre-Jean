import express, { Request, Response } from "express";
import { Lang } from "./lang.entities";
import { validate } from "class-validator";

const langController = express.Router();

langController.get("/", async (_: Request, res: Response) => {
  try {
    const langs = await Lang.find();
    res.status(200).json(langs);
  } catch (error) {
    console.error("error getting langs:", error);
    res.status(500).json({ error: "An error occured while getting the langs" });
  }
});

langController.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const lang = await Lang.findOneBy({ id });
    res.status(200).json(lang);
  } catch (error) {
    console.error("error getting langs:", error);
    res.status(500).json({ error: "An error occured while getting the langs" });
  }
});

langController.post("/", async (req: Request, res: Response) => {
  try {
    const lang = new Lang();
    lang.id = req.body.id;
    lang.label = req.body.label;
    const error = await validate(lang);
    if (error) {
      res.status(422);
    }
    await lang.save();

    res.status(201).json(lang);
  } catch (error) {
    console.error("error adding lang:", error);
    res.status(500).json({ error: "An error occured while adding the lang" });
  }
});

langController.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const lang = await Lang.findOneBy({ id });
    if (lang) {
      lang.id = req.body.id;
      lang.label = req.body.label;
      const error = await validate(lang);
      if (error) {
        res.status(422);
      }
      await lang.save();

      res.status(200).json(lang);
    } else {
      res.status(404).send("Lang not found");
    }
  } catch (error) {
    console.error("Error updating lang:", error);
    res.status(500).json({ error: "An error occured while updating the lang" });
  }
});

langController.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const lang = await Lang.findOneBy({ id });
    if (lang) {
      await lang.remove();
      res.status(200).send("lang deleted successfully");
    } else {
      res.status(404).send("Lang not found");
    }
  } catch (error) {
    console.error("Error deleting lang:", error);
    res.status(500).json({ error: "An error occured while deleting the lang" });
  }
});

export default langController;
