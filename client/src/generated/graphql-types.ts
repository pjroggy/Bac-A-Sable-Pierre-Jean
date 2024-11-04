import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Lang = {
  __typename?: 'Lang';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewRepo: Repo;
};


export type MutationCreateNewRepoArgs = {
  data: RepoInput;
};

export type Query = {
  __typename?: 'Query';
  allLangs: Array<Lang>;
  allRepos: Array<Repo>;
  allStatus: Array<Status>;
  repoById?: Maybe<Repo>;
};


export type QueryAllReposArgs = {
  filter?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryRepoByIdArgs = {
  id: Scalars['String']['input'];
};

export type Repo = {
  __typename?: 'Repo';
  id: Scalars['String']['output'];
  isFavorite: Scalars['Boolean']['output'];
  langs: Array<Lang>;
  name: Scalars['String']['output'];
  status: Status;
  url: Scalars['String']['output'];
};

export type RepoInput = {
  id: Scalars['String']['input'];
  isPrivate: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
};

export type GetAllRepoQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetAllRepoQuery = { __typename?: 'Query', allRepos: Array<{ __typename?: 'Repo', id: string, name: string, url: string, langs: Array<{ __typename?: 'Lang', id: number, label: string }>, status: { __typename?: 'Status', id: number, label: string } }>, allLangs: Array<{ __typename?: 'Lang', label: string, id: number }>, allStatus: Array<{ __typename?: 'Status', id: number, label: string }> };


export const GetAllRepoDocument = gql`
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

/**
 * __useGetAllRepoQuery__
 *
 * To run a query within a React component, call `useGetAllRepoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRepoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRepoQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllRepoQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRepoQuery, GetAllRepoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRepoQuery, GetAllRepoQueryVariables>(GetAllRepoDocument, options);
      }
export function useGetAllRepoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRepoQuery, GetAllRepoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRepoQuery, GetAllRepoQueryVariables>(GetAllRepoDocument, options);
        }
export function useGetAllRepoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllRepoQuery, GetAllRepoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllRepoQuery, GetAllRepoQueryVariables>(GetAllRepoDocument, options);
        }
export type GetAllRepoQueryHookResult = ReturnType<typeof useGetAllRepoQuery>;
export type GetAllRepoLazyQueryHookResult = ReturnType<typeof useGetAllRepoLazyQuery>;
export type GetAllRepoSuspenseQueryHookResult = ReturnType<typeof useGetAllRepoSuspenseQuery>;
export type GetAllRepoQueryResult = Apollo.QueryResult<GetAllRepoQuery, GetAllRepoQueryVariables>;