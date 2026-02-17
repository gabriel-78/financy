import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
      amount
      type
      description
      category {
        name
        id
      }
      user {
        id
        name
      }
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($deleteTransactionId: String!) {
    deleteTransaction(id: $deleteTransactionId)
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $data: UpdateTransactionInput!
    $updateTransactionId: String!
  ) {
    updateTransaction(data: $data, id: $updateTransactionId) {
      id
      amount
      description
      type
      categoryId
    }
  }
`;
