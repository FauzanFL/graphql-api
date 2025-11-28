import { GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
import { UserType } from "../types/UserType";
import { users } from "../../data/mock_data";

export const userQueries = {
  users: {
    type: GraphQLList(UserType),
    description: "List of users",
    resolve: () => users,
  },
  user: {
    type: UserType,
    description: "Get single user by ID",
    args: { id: { type: GraphQLNonNull(GraphQLInt) } },
    resolve: (parent, args) => users.find((user) => user.id === args.id),
  },
};

export const userMutations = {};
