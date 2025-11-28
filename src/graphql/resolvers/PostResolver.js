import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { PostType } from "../types/PostType";
import { posts, users } from "../../data/mock_data";

export const postQueries = {
  posts: {
    type: GraphQLList(PostType),
    description: "List of posts",
    resolve: () => posts,
  },
  post: {
    type: PostType,
    description: "Get single post by ID",
    args: { id: { type: GraphQLNonNull(GraphQLInt) } },
    resolve: (parent, args) => posts.find((post) => post.id === args.id),
  },
};

export const postMutations = {
  addPost: {
    type: PostType,
    description: "Add a new post",
    args: {
      content: { type: GraphQLNonNull(GraphQLString) },
      userId: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: (parent, { content, userId }) => {
      const userExists = users.some((user) => user.id === userId);
      if (!userExists) {
        throw new Error("User not found");
      }
      const newPost = { id: posts.length + 1, content, userId };
      posts.push(newPost);
      return newPost;
    },
  },
};
