import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGraphQLServer from './graphql';

// create express app
async function startApolloServer() {
const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());  


app.get('/', (req, res) => {
  res.json({ message: 'Hello World! I am grapql server' });
});

// apply express middleware
app.use("/graphql", expressMiddleware(await createApolloGraphQLServer()));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});

}

startApolloServer();
