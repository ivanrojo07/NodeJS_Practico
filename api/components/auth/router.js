const express = require('express');

const response = require('../../network/response');
const controller = require('./index');

const router = express.Router();

router.post('/login', function(req, res,next) {
    controller.login(req.body.username, req.body.password)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next)
})

module.exports = router;