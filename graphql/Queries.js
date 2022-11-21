import { gql } from "@apollo/client";

export const GETCHARACTERS = gql`
  query getCharacter($page: Int) {
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

export const GETCHARACTERFROMNAME = gql`
  query getCharacterFromName($name: String) {
    characters(filter: { name: $name }) {
      results {
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
        }
        episode {
          id
        }
      }
    }
  }
`;

export const GETLOCATIONS = gql`
  query getLocations($page: Int) {
    locations(page: $page) {
      results {
        name
        type
      }
    }
  }
`;

export const GETLOCATIONFROMNAME = gql`
  query getLocationFromName($name: String) {
    locations(filter: { name: $name }) {
      results {
        residents {
          name
          gender
          image
        }
      }
    }
  }
`;
