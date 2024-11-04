import { gql } from "@apollo/client";

export const UPDATE_REPO_FAVORITE = gql`
  mutation UpdateRepoFavorite($id: ID!, $isFavorite: Boolean!) {
    updateRepo(id: $id, isFavorite: $isFavorite) {
      id
      isFavorite
    }
  }
`;
