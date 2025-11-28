import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { userMutations, userQueries } from "./resolvers/UserResolver";
import { postMutations, postQueries } from "./resolvers/PostResolver";

const rootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  description: "Root query for reading data",
  fields: () => ({
    ...userQueries,
    ...postQueries,
  }),
});

const rootMutationType = new GraphQLObjectType({
  name: "RootMutation",
  description: "Root mutation for writing data",
  fields: () => ({
    ...userMutations,
    ...postMutations,
  }),
});

export const schema = new GraphQLSchema({
  query: rootQueryType,
  mutation: rootMutationType,
});
