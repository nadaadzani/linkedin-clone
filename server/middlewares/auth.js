const { GraphQLError } = require("graphql")
const { verifyToken } = require("../helpers/token")
const { readUserById } = require("../models/user")

const authentication = async (req) => {
    const authorization = req.headers.authorization

    if (!authorization) {
        throw new GraphQLError('Invalid token')
    }

    const token = authorization.split(' ')[1]
    const validToken = verifyToken(token)

    const user = await readUserById(validToken.userId)

    if (!user) {
        throw new GraphQLError('Invalid token')
    }

    return {
        userId: user[0]._id,
        userUsername: user[0].username
    }
}

module.exports = authentication