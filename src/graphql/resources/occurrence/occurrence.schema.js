const occurrenceTypes = `
    type Occurrence{
        id: ID!
        problem: String!
        note: String!
        state: String!
        typeService: String!
        createdDate: String!
        user: String!
    }
    input OccurrenceCreateInput {
        problem: String!
        state: String!
        note: String
        typeService: String!
        createdDate: String!
        closedDate: String
        user: String
    }
    input OccurrenceUpdateInput{
        problem: String
        state: String
        note: String
    }
`

const occurrenceQueries = `
    occurrences(first: Int, Offset: Int ): [Occurrence!]!
    occurrence(id: ID!): Occurrence
`

const occurrenceMutation = `
    createOccurrence(input: OccurrenceCreateInput!): Occurrence
    updateOccurrence(id: ID!, input:OccurrenceUpdateInput!): Occurrence
`
module.exports = {
    occurrenceTypes,
    occurrenceQueries,
    occurrenceMutation
}