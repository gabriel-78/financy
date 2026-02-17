import { gql } from "@apollo/client";

export const LIST_TRANSACTIONS = gql`
  query GetTransactionsByUser {
    getTransactionsByUser {
      amount
      category {
        color
        countTransactions
        createdAt
        creatorId
        description
        id
        name
        type
      }
      categoryId
      createdAt
      date
      description
      id
      type
      updatedAt
      userId
    }
  }
`;
