const success = function (req, res, body, status) {
    res.status(status || 200).send({
        error: null,
        body: body || "Success"
    });
}

const error = function (req, res, body, status, details) {
    console.error('[responseError]',details);
    res.status(status || 500).send({
        error: body || "Invalid data",
        body: null
    });
}


module.exports = {
    success,
    error
}