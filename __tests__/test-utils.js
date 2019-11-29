const app = require('../config/server')
const request = require('supertest')


const handleError = error => {
    const message = (error.response) ? error.response.res.text : error.message || error;
    return Promise.reject(`${error.name}: ${message}`);
};


module.exports = {
    app,
    request,
    handleError,
}