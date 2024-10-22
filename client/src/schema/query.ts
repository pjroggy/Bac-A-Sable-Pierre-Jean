import { gql } from "@apollo/client";

export const GET_REPOS = gql`
  query getAllRepo($filter: Float) {
  allRepos(filter: $filter) {
    id
    langs {
      id
      label
    }
    name
    status {
      id
      label
    }
    url
  }
  allLangs {
    label
    id
  }
  allStatus {
    id
    label
  }
}
`;