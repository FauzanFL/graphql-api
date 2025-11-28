import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} from "graphql";
import { posts } from "../../data/mock_data";

let PostType;

export const UserType = new GraphQLObjectType({
  name: "User",
  description: "A user",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (user) => {
        return posts.filter((post) => post.userId === user.id);
      },
    },
  }),
});
