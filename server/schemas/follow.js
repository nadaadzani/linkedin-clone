const { ObjectId } = require("mongodb")
const { createFollow } = require("../models/follow")

const typeDefs = `#graphql

    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    input FollowInput {
        followingId: ID
    }

    type Mutation {
        addFollow(inputFollow: FollowInput): Follow
    }
`

const resolvers = {
    Mutation: {
        addFollow: async (_parent, args, contextValue) => {
            const userLogin = await contextValue.authentication()

            const follow = await createFollow({
                followingId: new ObjectId(args.inputFollow.followingId),
            }, userLogin)

            return follow
        }
    }
}

module.exports = {
    followTypeDefs: typeDefs,
    followResolvers: resolvers
}