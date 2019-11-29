const tokenTypes = `
    type Token {
        token: String!
    }
`

const tokenMutation = `
    createToken(userName: String!, password: String!): Token

`

module.exports = {
    tokenTypes,
    tokenMutation
}
