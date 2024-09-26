import gql from 'graphql-tag'

export const GET_COUNTRY_DETAILS = gql`
  query GetCountryDetails($code: ID!) {
    country(code: $code) {
        name
        native
        capital
        currency
        languages {
          name
          native
        }
        states{
          name
        }
    }
  }
`;
