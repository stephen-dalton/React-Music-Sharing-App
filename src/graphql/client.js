import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { HASURA_ADMIN_SECRET } from '../secrets';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://musicshare-app.hasura.app/v1/graphql',
    headers: {
      "content-type": "application/json",
      'x-hasura-admin-secret': HASURA_ADMIN_SECRET
    }
  }),
  cache: new InMemoryCache(),
})

export default client;

