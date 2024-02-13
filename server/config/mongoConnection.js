require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

const dbName = 'gc-1-p3'
let db;

async function mongoConnect() {
    try {
        await client.connect()
        console.log('Successfully connected')

        db = client.db(dbName)
        const productionCollection = db.collection('users')

        const users = await productionCollection.find({}, { projection: { credentialValue: 0 } }).toArray()
        // console.log(users)
        return "done."
    } catch (error) {
        await client.close()
    }
}

function getDatabase() {
    return db
}

// mongoConnect().then(res => {
//     console.log(res)
// })

module.exports = {
    mongoConnect,
    getDatabase
}