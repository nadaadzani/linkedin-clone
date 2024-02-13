if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { mongoConnect } = require('./config/mongoConnection')
const { userTypeDefs, userResolvers } = require('./schemas/user');
const { postTypeDefs, postResolvers } = require('./schemas/post');
const { followTypeDefs, followResolvers } = require('./schemas/follow');
const authentication = require('./middlewares/auth');

const server = new ApolloServer({
    typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
    resolvers: [userResolvers, postResolvers, followResolvers],
    introspection: true
});

(async () => {
    const db = await mongoConnect()
    const { url } = await startStandaloneServer(server, {
        context: async ({ req, res }) => {
            return {
                authentication: async () => {
                    return authentication(req)
                }
            }
        },
        listen: { port: process.env.PORT || 3000 }
    })

    console.log(`🚀 Server ready at ${url}`)
})()