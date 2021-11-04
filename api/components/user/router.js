const express = require('express');
const secure = require('./secure');
const response = require('../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', function(req, res) {
    controller.list()
        .then((list)=>{
            response.success(req, res, list, 200);
        })
        .catch((error) =>{
            response.error(req, res, error, 400, error);
        })
});

router.get('/:id',secure('get'), function(req, res) {
    console.log('router',req.params.id);
    controller.get(req.params.id)
        .then( (user) => {
            if(user){
                response.success(req, res, user, 200);
            }
            else{
                response.error(req, res, "not found", 404,'User not found');
            }
        })
        .catch( (error) => {
            response.error(req, res, error, 400, error);
        });
});

router.post('/', function (req, res) {
    // console.log(req.body);
    let userParams = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
    };
    controller.set(userParams)
        .then( (user) => {
            response.success(req, res, user, 201);
        })
        .catch((error) =>{
            response.error(req, res, error, 401, error);
        });
});

router.delete('/:id',secure('delete'), function(req, res) {
    controller.remove(req.params.id)
        .then( (flag) => {
            response.success(req, res, flag, 200);
        })
        .catch( (error) => {
            response.error(req, res, error, 401, error);
        })
})

module.exports = router;