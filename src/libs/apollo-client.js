import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

// Create an http link:
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_APOLLO_GRAPHQL_URI,
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_APOLLO_SUBSCRIPTION_URI,
  options: {
    reconnect: true,
  },
});

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || null,
    },
  }));
  return forward(operation);
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: concat(authLink, link),
  cache,
});

const initialState = {
  token: '',
};

cache.modify({ data: initialState });

client.onResetStore(() => cache.modify({ data: initialState }));

export default client;
