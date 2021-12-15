import { gql } from '@apollo/client';

const CREATE_TRAINEE = gql`
  mutation CreateTrainee($name: String!, $email: String!, $role: String!, $password: String!) {
    createTrainee(
      user: {
        name: $name
        email: $email
        role: $role
        password: $password
      }
    ) {
      message
      result {
        originalId
        name
        email
        role
        createdAt
      }
      status
    }
  }
`;

const UPDATE_TRAINEE = gql`
  mutation UpdateTrainee($originalId: ID!, $name: String, $email: String) {
    updateTrainee(
      updateUser: { originalId: $originalId, name: $name, email: $email }
    ) {
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

const DELETE_TRAINEE = gql`
  mutation DeleteTrainee($id: ID!) {
    deleteTrainee(id: $id) {
      message
      acknowledged
      status
    }
  }
`;

export { CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE };
