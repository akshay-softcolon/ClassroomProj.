import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

// create express app
async function startApolloServer() {
const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

// create graphql server
const server = new ApolloServer({
  typeDefs: `
    type Query {
      hello: String!
      sayHello(name: String!): String!
      }`,
  resolvers: {
    Query: {
      hello: () => 'Hello World!',
      sayHello: (_: any, { name }: {name: string}) => `Hello ${name}!`,
    },
  },
//   context: ({ req, res }) => {
//     return {
//       req, 
//       res,
//     };
//   },
});

// start graphql server
await server.start();

app.get('/', (req, res) => {
  res.json({ message: 'Hello World! I am grapql server' });
});

// apply express middleware
app.use("/graphql", expressMiddleware(server));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});

}

startApolloServer();
