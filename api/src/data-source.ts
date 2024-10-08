import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

import { Repo } from "./repos/repos.entities";
import { Lang } from "./langs/lang.entities";
import { Status } from "./status/status.entities";

dotenv.config();
const { BACKEND_FILE } = process.env

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: `${BACKEND_FILE}`,
    entities: [Repo, Lang, Status],
    synchronize: true,
    logging: true,
    subscribers: [],
    migrations: [],
})