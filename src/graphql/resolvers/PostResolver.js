import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { PostType } from "../types/PostType.js";
import { posts, users } from "../../data/mock_data.js";

let POST_ID = 0;

export const postQueries = {
  posts: {
    type: new GraphQLList(PostType),
    description: "List of posts",
    resolve: () => posts,
  },
  post: {
    type: PostType,
    description: "Get single post by ID",
    args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
    resolve: (parent, args) => posts.find((post) => post.id === args.id),
  },
};

export const postMutations = {
  addPost: {
    type: PostType,
    description: "Add a new post",
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      body: { type: new GraphQLNonNull(GraphQLString) },
      userId: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (parent, { title, body, userId }) => {
      const userExists = users.some((user) => user.id === userId);
      if (!userExists) {
        throw new Error("User not found");
      }

      const newId = POST_ID++;
      const newPost = { id: newId, title, body, userId };
      posts.push(newPost);
      return newPost;
    },
  },
  updatePost: {
    type: PostType,
    description: "Update a post",
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      title: { type: GraphQLString },
      body: { type: GraphQLString },
      userId: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (parent, { id, title, body, userId }) => {
      const post = posts.find((post) => post.id === id);
      if (!post) {
        throw new Error("Post not found");
      }
      if (post.userId !== userId) {
        throw new Error("Unauthorized");
      }

      newTitle = title ? title : post.title;
      newBody = body ? body : post.body;

      post.title = newTitle;
      post.body = newBody;
      return post;
    },
  },
  deletePost: {
    type: PostType,
    description: "Delete a post",
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      userId: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (parent, { id, userId }) => {
      const post = posts.find((post) => post.id === id);
      if (!post) {
        throw new Error("Post not found");
      }
      if (post.userId !== userId) {
        throw new Error("Unauthorized");
      }
      posts.splice(posts.indexOf(post), 1);
      return post;
    },
  },
};