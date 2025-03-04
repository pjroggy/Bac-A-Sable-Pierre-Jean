import RepoCard from "../components/RepoCard";
import "./homePage.css";
import { useGetAllRepoQuery } from "../generated/graphql-types";
// import { useEffect, useState } from "react";
// import connexion from "./services/connexion";

// const GET_REPOS = gql`
//   query getAllRepo($filter: Float) {
//   allRepos(filter: $filter) {
//     id
//     langs {
//       id
//       label
//     }
//     name
//     status {
//       id
//       label
//     }
//     url
//   }
//   allLangs {
//     label
//     id
//   }
//   allStatus {
//     id
//     label
//   }
// }
// `;

export default function HomePage() {
  const { loading, error, data, refetch } =
    useGetAllRepoQuery();
    // GET_REPOS
    //   {
    //   variables: { filter: null }
    // }
  // const [repos, setRepos] = useState<Repo[]>([]);

  // useEffect(() => {
  //   const fetchRepos = async () => {
  //     try {
  //       const repos = await connexion.get<Repo[]>("/api/repos");

  //       console.log(repos.data);

  //       setRepos(repos.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchRepos();
  // }, []);

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <p>Error</p>;

  // const filteredRepo = (filter: string | null) => {
  //   refetch({ filter });
  // };
  if (data) {
    return (
      <>
        <h1>Aire de Repos de PJ!</h1>
        <div className="filter-buttons">
          <button onClick={() => refetch({ filter: null })}>
            Tout les langages
          </button>
          {data.allLangs.map((lang: { id: number; label: string }) => (
            <button key={lang.id} onClick={() => refetch({ filter: lang.id })}>
              {lang.label}
            </button>
          ))}
        </div>
        <section className="repoList">
          {data.allRepos.map((repo) => (
            <RepoCard
              key={repo.id}
              name={repo.name}
              url={repo.url}
              langs={repo.langs}
              status={repo.status}
              id={repo.id}
              isFavorite={repo.isFavorite}
            />
          ))}
        </section>
      </>
    );
  }
}

// const pers = {
//   id: 1,
//   name: "Bob",
//   firstname: "Smith",
//   like: false
// }

// // bouton pour passer à like

// const handleLike = () => {
//   const updatePers = {...pers};
//   updatePers.like = !pers.like
//   setPers(updatePers)
// }
// onClick={() => setPers((prev) => ({...prev, like: !prev.like}))}
