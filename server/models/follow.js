const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");

const getCollection = () => {
    const db = getDatabase()
    const followCollection = db.collection('follows')
    return followCollection
}

const getUserCollection = () => {
    const db = getDatabase()
    const userCollection = db.collection('users')
    return userCollection
}

const createFollow = async (payload, userLogin) => {
    const followCollection = getCollection()
    const userCollection = getUserCollection()
    //validasi follower not found and following not found
    const user = await userCollection.findOne({
        username: userLogin.userUsername
    })

    payload.followerId = user._id
    payload.createdAt = payload.updatedAt = new Date()
    // console.log(payload)
    const newFollow = await followCollection.insertOne(payload)

    const follow = await followCollection.findOne({
        _id: newFollow.insertedId
    })

    return follow
}

module.exports = {
    createFollow
}