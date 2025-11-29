import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} from "graphql";
import { posts } from "../../data/mock_data.js";
import { PostType } from "./PostType.js";   // ← IMPORT BIASA SAJA

export const UserType = new GraphQLObjectType({
  name: "User",
  description: "A user",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (user) =>
        posts.filter((post) => post.userId === user.id),
    },
  }),
});
