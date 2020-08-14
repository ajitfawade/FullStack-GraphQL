require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const { ApolloServer } = require("apollo-server-express");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { authCheck, authCheckMiddleware } = require("./helpers/auth");

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

app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));

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

// cloudinary config

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/upload-images", (req, res) => {
  cloudinary.uploader.upload(
    req.body.image,
    (result) => {
      res.send({
        url: result.secure_url,
        public_id: result.public_id,
      });
    },
    {
      public_id: `${Date.now()}`, //public name
      resourse_type: "auto", // JPEG, PNG
    }
  );
});

app.post("/removeimage", authCheckMiddleware, (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error });
    res.send("ok");
  });
});

// port

app.listen(process.env.PORT, () => {
  console.log(`Server is ready at http://localhost:${process.env.PORT}`);
  console.log(
    `GraphQL Server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
  );
});
