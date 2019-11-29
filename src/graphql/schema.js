const { makeExecutableSchema } = require('graphql-tools')
const { Query } = require('./query')
const { Mutation } = require('./mutation')
const { merge } = require('lodash')

const { userTypes } = require('./resources/user/user.schema')
const { tokenTypes } = require('./resources/token/token.schema')
const { occurrenceTypes } = require('./resources/occurrence/occurrence.schema')

const { userResolvers } = require('./resources/user/user.resolvers')
const { tokenResolvers } = require('./resources/token/token.resolvers')
const { occurrenceResolvers } = require('./resources/occurrence/occurrence.resolvers')

const resolvers = merge(
    userResolvers,
    tokenResolvers,
    occurrenceResolvers,
)


const SchemaDefinition = `
    type Schema{
        query: Query
        mutation: Mutation
    }
`
module.exports = makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        Query,
        Mutation,
        tokenTypes,
        userTypes,
        occurrenceTypes,
    ],
    resolvers
})