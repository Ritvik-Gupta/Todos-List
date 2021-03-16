import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type UserHollow = {
  __typename?: 'UserHollow';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  email: Scalars['String'];
  accessToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  email: Scalars['String'];
  accessToken: Scalars['String'];
  todos: Array<Todo>;
};

export type TodoHollow = {
  __typename?: 'TodoHollow';
  userId: Scalars['ID'];
  title: Scalars['String'];
  createdAt: Scalars['DateTime'];
  content: Scalars['String'];
};


export type Todo = {
  __typename?: 'Todo';
  userId: Scalars['ID'];
  title: Scalars['String'];
  createdAt: Scalars['DateTime'];
  content: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  fetchAllTodos: Array<Todo>;
  getAllUsers: Array<User>;
  currentUser?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: TodoHollow;
  login: UserHollow;
  register: UserHollow;
};


export type MutationCreateTodoArgs = {
  todoInput: TodoInput;
};


export type MutationLoginArgs = {
  loginInput: UserLoginInput;
};


export type MutationRegisterArgs = {
  registerInput: UserInput;
};

export type TodoInput = {
  title: Scalars['String'];
  content: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
};

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = (
  { __typename?: 'Query' }
  & { getAllUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'middleName' | 'lastName' | 'email'>
    & { todos: Array<(
      { __typename?: 'Todo' }
      & Pick<Todo, 'userId' | 'title' | 'createdAt' | 'content'>
    )> }
  )> }
);


export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getAllUsers {
    id
    firstName
    middleName
    lastName
    email
    todos {
      userId
      title
      createdAt
      content
    }
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, baseOptions);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, baseOptions);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;