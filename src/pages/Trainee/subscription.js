import { gql } from '@apollo/client';

const UPDATE_TRAINEE_SUB = gql`
  subscription {
    traineeUpdated {
      message
      result {
        originalId
        name
        email
        role
      }
      status
    }
  }
`;

const DELETE_TRAINEE_SUB = gql`
  subscription {
    traineeDeleted {
      message
      originalId
      acknowledged
      status
    }
  }
`;

export { UPDATE_TRAINEE_SUB, DELETE_TRAINEE_SUB };
