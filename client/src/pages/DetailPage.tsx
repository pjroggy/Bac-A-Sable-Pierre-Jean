import { useParams } from "react-router-dom";
import { gql, useApolloClient, useQuery } from "@apollo/client";

const REPO_BY_ID = gql`
  query RepoById($repoByIdId: String!) {
    repoById(id: $repoByIdId) {
      id
      langs {
        label
        id
      }
      isFavorite
      name
      status {
        label
        id
      }
      url
    }
  }
`;

export default function DetailPage() {
  const { id } = useParams();
  const client = useApolloClient();

  // Utilisez useQuery pour récupérer les données du dépôt
  const { loading, error, data } = useQuery(REPO_BY_ID, {
    variables: { repoByIdId: id }, // Passez l'ID ici
  });

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
        variables: {
          id: data.repoById.id,
          isFavorite: !data.repoById.isFavorite,
        },
      });
      // Affichez le nouveau statut de favori directement
      const updatedIsFavorite = updatedRepo.updateRepo.isFavorite;
      console.log("Updated favorite status:", updatedIsFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {data && (
        <div>
          <h1>{data.repoById.name}</h1>
          <button type="button" onClick={handleLike}>
            {data.repoById.isFavorite ? "DisLike 🩶" : "Like ❤️‍🔥"}
          </button>
        </div>
      )}
    </>
  );
}
