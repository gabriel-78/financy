import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      refreshToken
      token
      user {
        id
        email
        name
        createdAt
        updatedAt
      }
    }
  }
`;
