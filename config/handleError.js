module.exports.handleError = (error) => {
    let errorMessage = `${error.name}: ${error.message}`

    console.log(errorMessage)

    return Promise.reject(new Error(errorMessage))
}