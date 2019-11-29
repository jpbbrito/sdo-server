const express = require('express')
require('dotenv').config({
    path : process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})
const graphqlHTTP = require('express-graphql')
const schema = require('../src/graphql/schema')
const app = express()
const jwt = require('express-jwt')
const db = require('../src/models')

const auth = jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false
})

app.use('/graphql',
    auth,  
    (req, res, next) => {
        req['context'] = {};
        req['context'].db = db;
        req['context'].user= req.user;
        next();
    },
    graphqlHTTP((req) => ({
        schema: schema,
        graphiql: true,
        context: req['context'] 
    })
))

module.exports = app
