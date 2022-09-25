const apiErrorHandler = (error, req, res, next) => {
    return res.status(500)
        .send({
            status: 500,
            message: "Oops! Something went wrong.",
            details: error.message
        })
}

module.exports = apiErrorHandler