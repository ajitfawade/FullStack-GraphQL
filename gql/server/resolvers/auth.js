const { gql } = require("apollo-server-express");
const { authCheck } = require("../helpers/auth");

// resolvers
const me = async (parent, args, { req }) => {
  await authCheck(req);
  return "Ajit";
};

module.exports = {
  Query: {
    me,
  },
};
