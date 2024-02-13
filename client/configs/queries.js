import { gql } from "@apollo/client";

export const REGISTER = gql`
    mutation Mutation($inputRegister: RegisterInput) {
  register(inputRegister: $inputRegister) {
    _id
    name
    username
    email
    password
  }
}
`;

export const LOGIN = gql`
    mutation Mutation($inputLogin: LoginInput) {
  login(inputLogin: $inputLogin) {
    token
  }
}
`

export const GET_POSTS = gql`
query Query {
  getPosts {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`

export const GET_POST_BY_ID = gql`
query GetPostById($getPostByIdId: ID!) {
  getPostById(id: $getPostByIdId) {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`

export const SEARCH_USER_BY_USERNAME = gql`
query Query($username: String!) {
  searchUserByName(username: $username) {
    _id
    name
    username
    email
    password
  }
}
`

export const GET_USER_BY_LOGIN_INFO = gql`
query Query {
  getUserByLoginInfo {
    _id
    name
    username
    follower {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
    following {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
    followerProfile {
      _id
      name
      username
      email
      password
    }
    followingProfile {
      _id
      name
      username
      email
      password
    }
  }
}
`

export const GET_USER_BY_ID = gql`
query Query($getUserByIdId: ID!) {
  getUserById(id: $getUserByIdId) {
    _id
    name
    username
    follower {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
    following {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
    followerProfile {
      _id
      name
      username
      email
      password
    }
    followingProfile {
      _id
      name
      username
      email
      password
    }
  }
}
`

export const CREATE_POST = gql`
mutation Mutation($inputPost: PostInput) {
  addPost(inputPost: $inputPost) {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`

export const CREATE_COMMENT = gql`
mutation Mutation($inputComment: CommentInput, $postId: ID) {
  addComment(inputComment: $inputComment, postId: $postId) {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`

export const CREATE_LIKE = gql`
mutation Mutation($postId: ID) {
  addLike(postId: $postId) {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`

export const CREATE_FOLLOW = gql`
mutation Mutation($inputFollow: FollowInput) {
  addFollow(inputFollow: $inputFollow) {
    _id
    followingId
    followerId
    createdAt
    updatedAt
  }
}
`