import express, {NextFunction, Request, Response} from "express";
import Joi from "joi";

import langs from "../../data/langs.json";
import type { Lang } from "./lang.type";

const langController = express.Router(); 

const schema = Joi.object({
    id: Joi.number().required(),
    label: Joi.string().required()
})

const validateLang = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)

    if(error == null) {
        next()
    } else {
        res.status(422).json(error)
    }
}

langController.get("/", (_: any, res: Response)=>{
    res.status(200).json(langs)
})

langController.get("/:id", (req: Request, res: Response) => {
    
    const lang = langs.find(lg => lg.id=== parseInt(req.params.id)) as Lang;
    if (lang) {
        res.status(200).json(lang)
    }else {
        res.sendStatus(404)
    }
})

langController.post("/", validateLang, (req: Request, res: Response) => {
    langs.push(req.body)
    res.status(201).json(req.body)
})

export default langController;