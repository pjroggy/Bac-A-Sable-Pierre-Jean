import express, { Request, Response } from "express";
import { Status } from "./status.entities";
import { validate } from "class-validator";

const statusController = express.Router();

statusController.get("/status", async (_: Request, res: Response) => {
  try {
    const status = await Status.find();
    res.status(200).json(status);
  } catch (error) {
    console.error("error getting status:", error);
    res
      .status(500)
      .json({ error: "An error occured while getting the status" });
  }
});

statusController.get("/status/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const status = await Status.findOneBy({ id });
    res.status(200).json(status);
  } catch (error) {
    console.error("error getting status:", error);
    res
      .status(500)
      .json({ error: "An error occured while getting the status" });
  }
});

statusController.post("/", async (req: Request, res: Response) => {
  try {
    const status = new Status();
    status.id = req.body.id;
    status.label = req.body.label;
    const error = await validate(status);
    if (error) {
      res.status(422);
    }
    await status.save();

    res.status(201).json(status);
  } catch (error) {
    console.error("error adding status:", error);
    res.status(500).json({ error: "An error occured while adding the status" });
  }
});

statusController.put("/status/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const status = await Status.findOneBy({ id });
    if (status) {
      status.id = req.body.id;
      status.label = req.body.label;
      const error = await validate(status);
      if (error) {
        res.status(422);
      }
      await status.save();

      res.status(200).json(status);
    } else {
      res.status(404).send("status not found");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    res
      .status(500)
      .json({ error: "An error occured while updating the status" });
  }
});

statusController.delete("/status/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const status = await Status.findOneBy({ id });

    if (status) {
      await status.remove();
      res.status(200).send("status deleted successfully");
    } else {
      res.status(404).send("status not found");
    }
  } catch (error) {
    console.error("Error deleting status:", error);
    res
      .status(500)
      .json({ error: "An error occured while deleting the status" });
  }
});

export default statusController;
