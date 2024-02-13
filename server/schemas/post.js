const { ObjectId } = require("mongodb")
const { createPost, readPosts, readPostById, createComment, createLike } = require("../models/post")

const Redis = require("ioredis");

// Create a Redis instance.
// By default, it will connect to localhost:6379.
// We are going to cover how to specify connection options soon.
const redis = new Redis({
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

const typeDefs = `#graphql
    type Post {
        _id: ID
        content: String!
        tags: [String] # String, kalo ada dua data nanti jadi ada array nya
        imgUrl: String
        authorId: ID!
        comments: [Comment]
        likes: [Like]
        createdAt: String
        updatedAt: String
    }

    type Comment {
        content: String!
        username: String!
        createdAt: String
        updatedAt: String
    }

    type Like {
        username: String!
        createdAt: String
        updatedAt: String
    }

    input CommentInput {
        content: String!  
    }

    input PostInput {
        content: String!
        tags: [String]
        imgUrl: String
    }

    type Query {
        getPosts: [Post]
        getPostById(id: ID!): Post
    }

    type Mutation {
        addPost(inputPost: PostInput): Post
        addComment(inputComment: CommentInput, postId: ID): Post
        addLike(postId: ID): Post
    }

`

const resolvers = {
    Query: {
        getPosts: async (_parent, _args, contextValue) => {
            await contextValue.authentication()

            const postCache = await redis.get("posts")

            // console.log(postCache, "<<< this is post Cache")

            if (postCache) {
                return JSON.parse(postCache)
            }

            const posts = await readPosts()

            redis.set("posts", JSON.stringify(posts))
            return posts
        },
        getPostById: async (_parent, args, contextValue) => {
            await contextValue.authentication()

            const post = await readPostById(args.id)
            return post
        }
    },

    Mutation: {
        addPost: async (_parent, args, contextValue) => {
            const userLogin = await contextValue.authentication()

            const post = await createPost({
                content: args.inputPost.content,
                tags: args.inputPost.tags,
                imgUrl: args.inputPost.imgUrl,
            }, userLogin)

            /**
            cara 1: getPosts => set ulang cachenya 
            cara 2: delete langsung cachenya, sehingga nanti saat ada orang yg hit getPosts, maka langsung ke db
        
            */
            redis.del("posts"); //invalidate cache

            return post
        },
        addComment: async (_parent, args, contextValue) => {
            const userLogin = await contextValue.authentication()

            const comment = await createComment({
                content: args.inputComment.content,
            }, userLogin, args.postId)

            return comment
        },
        addLike: async (_parent, args, contextValue) => {
            const userLogin = await contextValue.authentication()

            const like = await createLike(userLogin, args.postId)

            return like
        }
    }
}

module.exports = {
    postTypeDefs: typeDefs,
    postResolvers: resolvers
}