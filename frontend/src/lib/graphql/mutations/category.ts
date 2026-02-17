import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      color
      createdAt
      creator {
        createdAt
        email
        id
        name
        updatedAt
      }
      creatorId
      description
      id
      name
      type
      updatedAt
    }
  }
`;
