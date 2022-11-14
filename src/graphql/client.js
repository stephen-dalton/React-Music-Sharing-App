import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "apollo-link-ws";
import { HASURA_ADMIN_SECRET } from "../secrets";
import { GET_QUEUED_SONGS } from "./queries";

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: "wss://musicshare-app.hasura.app/v1/graphql",
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
        },
      },
    },
  }),
  cache,
  typeDefs: gql`
    type Song {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      duration: Float!
      url: String!
    }

    input SongInput {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      duration: Float!
      url: String!
    }

    type Query {
      queue: [Song]!
    }

    type Mutation {
      addOrRemoveFromQueue(input: SongInput!): [Song]!
    }
  `,
  resolvers: {
    Mutation: {
      addOrRemoveFromQueue: (_, { input }, { cache }) => {
        const queryResult = cache.readQuery({
          query: GET_QUEUED_SONGS,
        });
        if (queryResult) {
          const { queue } = queryResult;
          const isInQueue = queue.some((song) => song.id === input.id);
          const newQueue = isInQueue
            ? queue.filter((song) => song.id !== input.id)
            : [...queue, input];
          cache.writeQuery({
            query: GET_QUEUED_SONGS,
            data: { queue: newQueue },
          });
          return newQueue;
        }
        return [];
      },
    },
  },
});

const hasQueue = Boolean(localStorage.getItem("queue"));

const writeInitalData = () => {
  cache.writeQuery({
    query: gql`
      query Query {
        queue
      }
    `,
    data: {
      queue: hasQueue ? JSON.parse(localStorage.getItem("queue")) : [],
    },
  });
};
writeInitalData();

export default client;
