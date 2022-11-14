import { gql } from "apollo-boost";

export const GET_SONGS = gql`
  query getSongs {
    songs(order_by: { created_at: desc }) {
      url
      title
      thumbnail
      id
      duration
      created_at
      artist
    }
  }
`;

export const GET_QUEUED_SONGS = gql`
  query getQueuedSongs {
    queue @client {
      id
      duration
      title
      artist
      thumbnail
      url
    }
  }
`;
