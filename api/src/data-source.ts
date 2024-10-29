import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Repo } from "./repos/repos.entities";
import { Lang } from "./langs/lang.entities";
import { Status } from "./status/status.entities";

dotenv.config();
const { POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_USER, POSTGRES_HOST } =
  process.env;

// export const AppDataSource = new DataSource({
//   type: "sqlite",
//   database: `${BACKEND_FILE}`,
//   entities: [Repo, Lang, Status],
//   synchronize: true,
//   logging: false
// });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [Repo, Status, Lang],
  synchronize: true,
});
