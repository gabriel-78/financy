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

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($deleteCategoryId: String!) {
    deleteCategory(id: $deleteCategoryId)
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $data: UpdateCategoryInput!
    $updateCategoryId: String!
  ) {
    updateCategory(data: $data, id: $updateCategoryId) {
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
