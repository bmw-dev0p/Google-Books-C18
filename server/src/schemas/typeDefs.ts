import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    books: [Book]!
  }

  type Book {
    _id: ID
    authors: String
    description: String
    title: String
    image: String
    link: String
  }
  
  type Auth {
    token: ID!
    user: User
  }
    
  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input BookInput {
    authors: String!
    description: String!
    title: String!
    image: String
    link: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    books: [Book]!
    book(bookId: ID!): Book
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: BookInput!): Book
    removeBook(bookId: ID!): Book
  }
`;

export default typeDefs;
