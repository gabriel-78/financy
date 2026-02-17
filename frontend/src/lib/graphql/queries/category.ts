import { gql } from "@apollo/client";

export const LIST_CATEGORIES = gql`
  query GetCategoriesByCreator {
    getCategoriesByCreator {
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
      countTransactions
    }
  }
`;
