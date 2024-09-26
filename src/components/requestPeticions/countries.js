import gql from 'graphql-tag'

export const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      continent{
        code
        name
      }
    }
  }
`;
