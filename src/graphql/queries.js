/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchSuperheroes = /* GraphQL */ `
  query SearchSuperheroes($name: String) {
    searchSuperheroes(name: $name) {
      id
      name
      image {
        url
        __typename
      }
      powerstats {
        intelligence
        strength
        speed
        durability
        power
        combat
        __typename
      }
      __typename
    }
  }
`;
export const getSavedSuperheroes = /* GraphQL */ `
  query GetSavedSuperheroes($userId: ID!) {
    getSavedSuperheroes(userId: $userId) {
      id
      userId
      name
      image {
        url
        __typename
      }
      powerstats {
        intelligence
        strength
        speed
        durability
        power
        combat
        __typename
      }
      __typename
    }
  }
`;
