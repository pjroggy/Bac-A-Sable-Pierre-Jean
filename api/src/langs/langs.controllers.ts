import express, { NextFunction, Request, Response } from "express";
import Joi from "joi";

import langs from "../../data/langs.json";
import type { Lang } from "./lang.type";

let myLangs: Array<Lang> = langs;

const langController = express.Router();

const schema = Joi.object({
  id: Joi.number().required(),
  label: Joi.string().required(),
});

const validateLang = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error == null) {
    next();
  } else {
    res.status(422).json(error);
  }
};

langController.get("/", (req: Request, res: Response) => {
  const { label } = req.query;
  const result =
    label !== undefined
      ? myLangs.filter((lang: Lang) => lang.label === label)
      : myLangs;
  res.status(200).json(result);
});

langController.get("/:id", (req: Request, res: Response) => {
  const lang = langs.find((lg) => lg.id === parseInt(req.params.id)) as Lang;
  if (lang) {
    res.status(200).json(lang);
  } else {
    res.sendStatus(404);
  }
});

langController.post("/", validateLang, (req: Request, res: Response) => {
  langs.push(req.body);
  res.status(201).json(req.body);
});

// langController.put("/:id", validateLang, (req: Request, res: Response) =>{
//     langs.map(req)
// })

langController.delete("/:id", (req: Request, res: Response) => {
  myLangs = myLangs.filter((lang: Lang) => lang.id !== parseInt(req.params.id));
  res.sendStatus(204);
});

export default langController;
