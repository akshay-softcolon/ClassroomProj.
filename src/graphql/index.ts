import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db";
import { User } from "./user";

async function createApolloGraphQLServer() {
 // create graphql server
const server = new ApolloServer({
  typeDefs: `
    type Query {
      hello: String
    }
    type Mutation {
      ${User.mutations}
    }
  `,

  resolvers: {
    Query: {
      ...User.resolvers.queries,
    },  
    Mutation: {
      // ...User.resolvers.mutations,
    },
  },
});

// start graphql server
await server.start();

return server;
}

export default createApolloGraphQLServer;