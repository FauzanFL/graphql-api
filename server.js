import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./src/graphql/schema";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
