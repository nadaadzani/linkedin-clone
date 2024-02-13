const { getDatabase } = require('../config/mongoConnection')
const { ObjectId } = require('mongodb')
const { hashPass } = require('../helpers/hash')
const { readUserById, readSearchUserByName, register, login, readUserByLoginInfo } = require('../models/user')

const typeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username: String!
        email: String!
        password: String
    }

    type UserProfile {
        _id: ID
        name: String
        username: String
        follower: [Follow]
        following: [Follow]
        followerProfile: [User]
        followingProfile: [User]
    }

    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    input RegisterInput {
        name: String
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    type ResponseLogin {
        token: String
    }

    type Query {
        getUsers: [User]
        getUserById(id: ID!): UserProfile
        getUserByLoginInfo: UserProfile
        searchUserByName(username: String!): [User]
    }

    type Mutation {
        register(inputRegister: RegisterInput): User
        login(inputLogin: LoginInput): ResponseLogin
    }
`

const resolvers = {
    Query: {
        getUsers: async (_parent, _args, contextValue) => {
            await contextValue.authentication()
            const db = getDatabase()
            const userCollection = db.collection('users')


            const users = await userCollection.find({}).toArray()
            return users
        },
        getUserById: async (_, args, contextValue) => {
            await contextValue.authentication()

            const user = await readUserById(args.id)

            return user[0]
        },
        searchUserByName: async (_, args, contextValue) => {
            await contextValue.authentication()
            const user = await readSearchUserByName(args.username)

            return user
        },
        getUserByLoginInfo: async (_, args, contextValue) => {
            const userLogin = await contextValue.authentication()

            const user = await readUserByLoginInfo(userLogin)
            // console.log(user)
            return user
        }
    },
    Mutation: {
        register: async (_, args) => {
            const newUser = await register({
                name: args.inputRegister.name,
                username: args.inputRegister.username,
                email: args.inputRegister.email,
                password: hashPass(args.inputRegister.password)
            })

            return newUser
        },
        login: async (_, args) => {
            const currentToken = await login({
                username: args.inputLogin.username,
                password: args.inputLogin.password
            })

            return currentToken
        }
    }

}

module.exports = {
    userTypeDefs: typeDefs,
    userResolvers: resolvers
}