import { gql } from "@apollo/client";

export const GETCHARACTERS = gql`
  query getCharacters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
        gender
        status
      }
    }
  }
`;

export const GETLOCATIONS = gql`
  query getLocations($page: Int) {
    locations(page: $page) {
      results {
        id
        name
        type
      }
    }
  }
`;

export const GETEPISODES = gql`
  query getEpisodes($page: Int) {
    episodes(page: $page) {
      results {
        id
        name
        episode
        characters {
          name
        }
      }
    }
  }
`;

export const GETCHARACTER = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      gender
      status
      species
      origin {
        name
      }
      location {
        name
        id
      }
      episode {
        name
        id
      }
    }
  }
`;

export const GETLOCATION = gql`
  query getLocation($id: ID!) {
    location(id: $id) {
      id
      name
      residents {
        id
        name
        gender
        image
        episode {
          id
          name
        }
      }
    }
  }
`;

export const GETEPISODE = gql`
  query getEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      characters {
        id
        name
        image
      }
    }
  }
`;
