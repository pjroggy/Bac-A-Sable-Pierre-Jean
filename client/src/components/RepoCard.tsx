// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import type { Repo } from "../types/RepoTypes";
export default function RepoCard({ name, url, id, langs }: Repo) {

  return (
    <>
      <h2>{name}</h2>
      <a href={url} target="_blank">
        {url}
      </a>{" "}
      <ul>
        {langs.map((lang) => (
          <li key={lang.id}>{lang.label}</li>
        ))}{" "}
      </ul>
      <Link to={`/detail/${id}`} >Plus d'infos</Link>
      {/* <Link to={`/repo/${name}`}>En savoir plus</Link> */}
    </>
  );
}
