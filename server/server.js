require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { authCheck } = require("./helpers/auth");

const http = require("http");

// express server
const app = express();

const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection error", error);
  }
};

// execute database connection
db();

// typedefs
const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "./typedefs"))
);

// resolvers
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers"))
);

// graphql-server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

// applyMiddleware method connects apollo server to specific http framework ie:express

apolloServer.applyMiddleware({
  app,
});

// server

const httpServer = http.createServer(app);

// rest endpoint
app.get("/rest", authCheck, (req, res) => {
  res.json({ data: "you hit rest endpoint" });
});

// port

app.listen(process.env.PORT, () => {
  console.log(`Server is ready at http://localhost:${process.env.PORT}`);
  console.log(
    `GraphQL Server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
  );
});
