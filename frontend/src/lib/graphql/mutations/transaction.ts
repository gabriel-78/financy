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

// export const DELETE_CATEGORY = gql`
//   mutation DeleteCategory($deleteCategoryId: String!) {
//     deleteCategory(id: $deleteCategoryId)
//   }
// `;

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
