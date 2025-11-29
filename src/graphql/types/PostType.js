import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} from "graphql";
import { users } from "../../data/mock_data.js";
import { UserType } from "./UserType.js";

export const PostType = new GraphQLObjectType({
  name: "Post",
  description: "A post",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: (post) =>
        users.find((user) => user.id === post.userId),
    },
  }),
});
