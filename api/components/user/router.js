const express = require('express');
const secure = require('./secure');
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

router.post('/follow/:id', secure('follow'), function (req, res, next) {
    if( req.user.id == req.params.id){
        response.error(req, res, "No puedes seguirte a ti mismo");
    }
    controller.follow(req.user.id, req.params.id)
        .then(data =>{
            response.success(req, res, data, 201);
        })
        .catch(next);
});

router.get('/:id/following', function (req, res, next) {
    return controller.following(req.params.id)
                .then( (data) => {
                    return response.success(req, res, data, 200);
                })
                .catch(next);
})

router.get('/:id', function(req, res, next) {
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

router.put('/', secure('update'), function (req, res) {
    // console.log(req.body);
    controller.set(req.body)
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