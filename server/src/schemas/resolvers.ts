import { User, Book } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth.js'; 

// Define types for the arguments
interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  username: string;
}

interface BookArgs {
  bookId: string;
}

interface AddBookArgs {
  input:{
    authors: string;
    description: string;
    title: string;
    image: string;
    link: string;
  }
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('books');
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate('books');
    },
    books: async () => {
      return await Book.find().sort({ createdAt: -1 });
    },
    book: async (_parent: any, { bookId }: BookArgs) => {
      return await Book.findOne({ _id: bookId });
    },
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('books');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    saveBook: async (_parent: any, { input }: AddBookArgs, context: any) => {
      if (context.user) {
        const book = await Book.create({ ...input });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { books: book._id } }
        );

        return book;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeBook: async (_parent: any, { bookId }: BookArgs, context: any) => {
      if (context.user) {
        const book = await Book.findOneAndDelete({
          _id: bookId,
          // Assuming books have an owner field to verify the book's owner
          owner: context.user.username,
        });

        if (!book) {
          throw new AuthenticationError('No book found with this ID.');
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { books: book._id } }
        );

        return book;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

export default resolvers;
