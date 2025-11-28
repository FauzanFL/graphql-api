import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { users } from "../../data/mock_data";

let UserType;

export const PostType = new GraphQLObjectType({
  name: "Post",
  description: "A social media post",
  fields: async () => {
    UserType = UserType || (await import("./UserType.js")).UserType;
    return {
      id: { type: GraphQLNonNull(GraphQLInt) },
      title: { type: GraphQLString },
      body: { type: GraphQLString },
      user: {
        type: UserType,
        resolve: (post) => {
          return users.find((user) => user.id === post.userId);
        },
      },
    };
  },
});
