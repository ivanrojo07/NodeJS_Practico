const express = require('express');
const response = require('../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', function(req, res, next) {
    controller.list()
        .then((list)=>{
            response.success(req, res, list, 200);
        })
        .catch(next)
});

module.exports = router;