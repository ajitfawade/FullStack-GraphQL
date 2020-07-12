const { gql } = require("apollo-server-express");

// resolvers
const me = () => "Ajit";

module.exports = {
  Query: {
    me,
  },
};
