const express = require('express');

const response = require('../../network/response');
const controller = require('./index');

const router = express.Router();

router.post('/login', function(req, res) {
    controller.login(req.body.username, req.body.password)
        .then((data) => {
            console.log(data);
            response.success(req, res, data, 200);
        })
        .catch(error=>{
            response.error(req, res, 'Información invalida', 400, error);
        })
})

module.exports = router;