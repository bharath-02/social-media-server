const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const colors = require('colors');

const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers/index');
const { DB_URL } = require('./config.js');

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected'.yellow.bold);
        return server.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`.cyan.bold);
    })
    .catch((err) => {
        console.log('Error Occured'.red.bold + err);
    })