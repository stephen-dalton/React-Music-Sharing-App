import { ApolloClient, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';
import { HASURA_ADMIN_SECRET } from '../secrets';

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: 'wss://musicshare-app.hasura.app/v1/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          "content-type": "application/json",
          'x-hasura-admin-secret': HASURA_ADMIN_SECRET
        },
      }
    }
  }),
  cache: new InMemoryCache(),
})

export default client;

