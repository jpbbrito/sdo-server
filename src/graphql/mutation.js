const { userMutation } = require('./resources/user/user.schema')
const { tokenMutation } = require('./resources/token/token.schema')
const { occurrenceMutation } = require('./resources/occurrence/occurrence.schema')
const Mutation = `
    type Mutation {
        ${userMutation}
        ${tokenMutation}
        ${occurrenceMutation}
    }
`

module.exports = { 
    Mutation
 }