const { GraphQLServer } = require("graphql-yoga");
const { find, filter } = require("lodash");
const fetch = require("node-fetch");

const resolvers = {
  Query: {
    test: () => "Testing the GraphQL Server",
    users: () => {
      return fetchUrl("http://localhost:3002/users");
    },
    cars: () => {
      return fetchUrl("http://localhost:3002/cars");
    },
    car: (parent, args) => {
      return fetchUrl("http://localhost:3002/cars", args);
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

const fetchUrl = (url, param) => {
  const params = new URLSearchParams(param).toString();
  return fetch(`${url}?${params}`)
    .then(res => res.json())
    .then(json => json);
};

server.start(() => console.log(`Server is running on http://localhost:4000`));
