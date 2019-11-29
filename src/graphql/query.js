const { userQueries } = require('./resources/user/user.schema')
const { occurrenceQueries } = require('./resources/occurrence/occurrence.schema')


const Query = `
    type Query {
        ${userQueries}
        ${occurrenceQueries}
    }
`

module.exports = {
    Query
}