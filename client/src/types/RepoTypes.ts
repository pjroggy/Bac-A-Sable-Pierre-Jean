import type { Lang } from "./LangTypes";
import { Status } from "./StatusTypes";

export type Repo = {
  id: string;
  name: string;
  url: string;
  langs: Lang[];
  status: Status;
  isFavorite: boolean;
};