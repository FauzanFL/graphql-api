import express from "express";
import {createHandler} from "graphql-http/lib/use/express";
import { schema } from "./src/graphql/schema.js";

const app = express();

app.use(
  "/graphql",
  createHandler({
    schema: schema,
  })
);

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
