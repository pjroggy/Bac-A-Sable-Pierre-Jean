import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Repo } from "../types/RepoTypes";
import { gql, useApolloClient } from "@apollo/client";

export default function DetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<Repo | undefined>(undefined);
  const client = useApolloClient();

  const handleLike = async () => {
    if (!data) return;
    try {
      const { data: updatedRepo } = await client.mutate({
        mutation: gql`
          mutation UpdateRepoFavorite($id: ID!, $isFavorite: Boolean!) {
            updateRepo(id: $id, isFavorite: $isFavorite) {
              id
              isFavorite
            }
          }
        `,
        variables: { id, isFavorite: !data.isFavorite },
      });
      setData({ ...data, isFavorite: updatedRepo.updateRepo.isFavorite });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const { data: repoData } = await client.query({
          query: gql`
            query GetRepo($id: ID!) {
              repo(id: $id) {
                id
                name
                isFavorite
              }
            }
          `,
          variables: { id },
        });
        console.log("Fetched Repo Data:", repoData);
        setData(repoData.repo);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRepos();
  }, [id, client]);

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
