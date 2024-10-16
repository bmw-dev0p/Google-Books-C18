import { gql } from '@apollo/client';


// Future development
// ----------------------------------------------------------
// // Query to get user information along with their saved books
// export const QUERY_USER = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//       savedBooks {
//         bookId
//         title
//         authors
//         description
//         image
//         link
//       }
//     }
//   }
// `;

// // Query to get all books
// export const QUERY_BOOKS = gql`
//   query getBooks {
//     books {
//       bookId
//       title
//       authors
//       description
//       image
//       link
//     }
//   }
// `;

// // Query to get a single book by its ID
// export const QUERY_SINGLE_BOOK = gql`
//   query getSingleBook($bookId: ID!) {
//     book(bookId: $bookId) {
//       bookId
//       title
//       authors
//       description
//       image
//       link
//     }
//   }
// `;
// ----------------------------------------------------------

// Query to get the authenticated user's information along with their saved books
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;
