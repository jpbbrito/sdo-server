const userTypes = `
    type User{
        id: ID!
        name: String!
        userName: String!
        createdAt: String!
    }
    input UserCreateInput {
        name: String!
        userName: String!
        password: String!
    }

    input UserUpdateInput {
        name: String
    }

    input UserUpdatePasswordInput {
        password: String!
    }
`
const userQueries = `
    users(first: Int, offset: Int): [User! ]!
    user(id: ID!): User
`

const userMutation  = `
    createUser(input: UserCreateInput!): User
    updateUser(input: UserUpdateInput!): User
    updateUserPassword(input: UserUpdatePasswordInput!): Boolean
`

module.exports = {
    userTypes,
    userQueries,
    userMutation
}