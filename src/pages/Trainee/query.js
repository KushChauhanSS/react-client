import { gql } from '@apollo/client';

const GET_TRAINEES = gql`
  query GetTrainees($limit: Int, $skip: Int) {
    getAllTrainees(limit: $limit, skip: $skip) {
      message
      result {
        documents
        userData {
          originalId
          name
          email
          role
          createdAt
        }
      }
      status
    }
  }
`;

export { GET_TRAINEES };
