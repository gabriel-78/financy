import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($data: RegisterInput!) {
    register(data: $data) {
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
