import gql from 'graphql-tag'

export const LINKS_QUERY = gql`
  query ($searchText: String){
    links (search: $searchText) {
      id
      createdAt
      description
      url
      postedBy {
        id
        username
      }
      votes {
        edges {
          node {
            id
            user {
              id
            }
          }
        }
      }
    }
  }
`

export const CREATE_LINK_MUTATION = gql`
  mutation($description: String!, $url: String!) {
    createLink(
      description: $description,
      url: $url
    ) {
      id
      url
      description
      postedBy {
        id
        username
      }
    }
  }
`

export const CREATE_VOTE_MUTATION = gql`
  mutation($linkId: ID!) {
    createVote(linkId: $linkId) {
      link {
        votes {
          edges {
            node {
              id
              user {
                id
              }
            }
          }
        }
      }
      user {
        id
      }
    }
  }
`

export const CREATE_USER_MUTATION = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    createUser(
      username: $username,
      email: $email,
      password: $password
    ) {
      user {
        id
        token
      }
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      user {
        id
        token
      }
    }
  }
`

export const TOKEN_AUTH_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`

export const VERIFY_TOKEN_MUTATION = gql`
  mutation($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`

export const REFRESH_TOKEN_MUTATION = gql`
  mutation($token: String!) {
    refreshToken(token: $token) {
      token
      payload
    }
  }
`
