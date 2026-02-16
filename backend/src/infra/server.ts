import 'reflect-metadata';
import 'dotenv/config';
import '../graphql/enums';
import { HelloResolver } from '@/resolvers/hello.resolver';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { AuthResolver } from '@/resolvers/auth.resolver';
import { UserResolver } from '@/resolvers/user.resolver';
import { buildContext } from '@/graphql/contexts';
import { CategoryResolver } from '@/resolvers/category.resolver';

async function bootstrap() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [HelloResolver, AuthResolver, UserResolver, CategoryResolver],
    validate: false,
    emitSchemaFile: './schema.graphql',
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server, { context: buildContext }));

  app.listen({ port: 4000 }, () => {
    console.log('Server is running on http://localhost:4000/graphql');
  });
}

bootstrap();
