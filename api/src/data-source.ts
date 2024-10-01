import { DataSource } from "typeorm";

import { Repo } from "./entities/repos";
import { Lang } from "./entities/langs";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "../api/data/db.sqlite",
    synchronize: true,
    logging: true,
    entities: [Repo, Lang],
    subscribers: [],
    migrations: [],
})