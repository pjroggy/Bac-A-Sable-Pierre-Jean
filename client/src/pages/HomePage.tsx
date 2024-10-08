import RepoCard from "../components/RepoCard";
import type { Repo } from "../types/RepoTypes";
import { useEffect, useState } from "react";
import connexion from "../service/connexion";

export default function HomePage() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repos = await connexion.get<Repo[]>("/api/repos");

        console.log(repos.data);
        

        setRepos(repos.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRepos();
  }, []);

  return (
    <>
      {repos.map((repo: Repo) => (
        <RepoCard key={repo.id} name={repo.name} url={repo.url} langs={repo.langs} status={repo.status} id={repo.id}/>
      ))}
    </>
  );
}
