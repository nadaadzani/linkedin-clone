const { ObjectId } = require("mongodb");
const { GraphQLError } = require("graphql")
const { getDatabase } = require("../config/mongoConnection");

const getCollection = () => {
    const db = getDatabase()
    const postCollection = db.collection('posts')
    return postCollection
}

const readPosts = async () => {
    const postCollection = getCollection()

    const posts = await postCollection.find({}).toArray()
    return posts
}

const readPostById = async (payload) => {
    const postCollection = getCollection()
    const post = await postCollection.findOne({
        _id: new ObjectId(payload)
    })

    return post
}

const createPost = async (payload, userLogin) => {
    const postCollection = getCollection()

    if (!payload.content || payload.content === '') {
        throw new GraphQLError('Content must be filled')
    }

    if (payload.tags[0].includes(' ')) {
        payload.tags = payload.tags[0].split(' ')
    }

    payload.authorId = new ObjectId(userLogin.userId)
    payload.likes = []
    payload.comments = []
    payload.createdAt = payload.updatedAt = new Date()

    const newPost = await postCollection.insertOne(payload)

    const post = await postCollection.findOne({
        _id: newPost.insertedId
    })

    return post
}

const createComment = async (payload, userLogin, postId) => {
    const postCollection = getCollection()
    payload.createdAt = payload.updatedAt = new Date()
    // console.log(payload, userLogin, postId)
    const currentPost = await postCollection.findOne({
        _id: new ObjectId(postId)
    })

    await postCollection.updateOne({
        _id: new ObjectId(postId)
    }, {
        $push: {
            comments: {
                username: userLogin.userUsername,
                content: payload.content,
                createdAt: payload.createdAt,
                updatedAt: payload.updatedAt
            }
        }
    })

    const currentUpdatedPost = await postCollection.findOne({
        _id: currentPost._id
    })

    return currentUpdatedPost
}

const createLike = async (userLogin, postId) => {
    const postCollection = getCollection()

    const currentPost = await postCollection.findOne({
        _id: new ObjectId(postId),
    })

    await postCollection.updateOne({
        _id: currentPost._id,
    }, {
        $push: {
            likes: {
                username: userLogin.userUsername,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        }
    })

    const currentUpdatedPost = await postCollection.findOne({
        _id: currentPost._id
    })

    return currentUpdatedPost
}

module.exports = {
    createPost,
    readPosts,
    readPostById,
    createComment,
    createLike
}