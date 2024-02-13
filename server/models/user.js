const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const { comparePass } = require("../helpers/hash");
const { signToken } = require("../helpers/token");
const { GraphQLError } = require("graphql");

const getCollection = () => {
    const db = getDatabase()
    const userCollection = db.collection('users')
    return userCollection
}

const readUserById = async (payload) => {
    const userCollection = getCollection()

    const agg = [
        {
            '$match': {
                '_id': new ObjectId(`${payload}`)
            }
        }, {
            '$lookup': {
                'from': 'follows',
                'localField': '_id',
                'foreignField': 'followingId',
                'as': 'follower'
            }
        }, {
            '$lookup': {
                'from': 'follows',
                'localField': '_id',
                'foreignField': 'followerId',
                'as': 'following'
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'follower.followerId',
                'foreignField': '_id',
                'as': 'followerProfile'
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'following.followingId',
                'foreignField': '_id',
                'as': 'followingProfile'
            }
        }, {
            '$project': {
                'email': 0,
                'password': 0,
                'followerProfile.password': 0,
                'followingProfile.password': 0
            }
        }
    ];

    const user = await userCollection.aggregate(agg).toArray()
    // console.log(user)
    return user
}

const readUserByLoginInfo = async (payload) => {
    const userCollection = getCollection()

    console.log(payload.userId)

    const agg = [
        {
            '$match': {
                '_id': payload.userId
            }
        }, {
            '$lookup': {
                'from': 'follows',
                'localField': '_id',
                'foreignField': 'followingId',
                'as': 'follower'
            }
        }, {
            '$lookup': {
                'from': 'follows',
                'localField': '_id',
                'foreignField': 'followerId',
                'as': 'following'
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'follower.followerId',
                'foreignField': '_id',
                'as': 'followerProfile'
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'following.followingId',
                'foreignField': '_id',
                'as': 'followingProfile'
            }
        }, {
            '$project': {
                'email': 0,
                'password': 0,
                'followerProfile.password': 0,
                'followingProfile.password': 0
            }
        }
    ];

    const user = await userCollection.aggregate(agg).toArray()

    return user[0]
}

const readSearchUserByName = async (payload) => {
    const userCollection = getCollection()
    let user;
    if (!payload || payload === '') {
        user = await userCollection.find({}).toArray()
        return user
    }

    user = await userCollection.find({
        username: { $regex: payload, $options: "i" }
    }, { projection: { password: 0 } }).toArray()

    return user
}

const register = async (payload) => {
    const userCollection = getCollection()

    const foundUser = await userCollection.findOne({
        username: payload.username
    })

    if (foundUser) throw new GraphQLError('Username must be unique')

    const foundUserByEmail = await userCollection.findOne({
        email: payload.email
    })

    if (foundUserByEmail) throw new GraphQLError('Email must be unique')

    const newUser = await userCollection.insertOne(payload)

    const user = await userCollection.findOne({
        _id: newUser.insertedId
    }, { projection: { password: 0 } })

    return user
}

const login = async (payload) => {
    const userCollection = getCollection()
    const { username, password } = payload

    const user = await userCollection.findOne({
        username
    })

    // console.log(user, payload, '<<< di login models server')

    if (!user) {
        throw new GraphQLError("Invalid email/password")
    }

    const validUser = comparePass(password, user.password)

    if (!validUser) {
        throw new GraphQLError("Invalid email/password")
    }

    const token = signToken({
        userId: user._id,
        userUsername: user.username
    })

    return { token }
}

module.exports = {
    readUserById,
    readSearchUserByName,
    readUserByLoginInfo,
    register,
    login
}