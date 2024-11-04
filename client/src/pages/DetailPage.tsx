import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Repo } from "../types/RepoTypes";
import connexion from "../service/connexion";

export default function DetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<Repo> ;

  const handleLike = async () => {
    try {
      await connexion.patch(`/api/repos/${id}`, {
        isFavorite: !data.isFavorite,
      });
      // const newRepos = { ...data } as Repo;
      // newRepos.isFavorite = !data?.isFavorite;
      // setData(newRepos);
      setData({ ...data, isFavorite: !data.isFavorite });
    } catch (error) {
      console.error(error);
    }
  };

  <div>DetailPage {id}</div>;
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repos = await connexion.get(`/api/repos/${id}`);
        setData(repos.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRepos();
  }, [id]);

  return (
    <>
      {data && (
        <div>
          <h1>{data.name}</h1>
          <button type="button" onClick={handleLike}>
            {data.isFavorite ? "DisLike 🩶" : "Like ❤️‍🔥"}
          </button>
        </div>
      )}
    </>
  );
}

// /**
//  * Initialisation
//  * data = {} ou undefined
//  *
//  * Après le useEffect
//  * data = {
//  *    pers: {
//  *      firstname: "Bob"
//  *    }
//  * }
//  */
