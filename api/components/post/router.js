const express = require('express');
const response = require('../../network/response');
const controller = require('./index');
const secure = require('./secure');

const router = express.Router();

router.get('/', function(req, res, next) {
    controller.list()
        .then((list)=>{
            response.success(req, res, list, 200);
        })
        .catch(next)
});

router.get('/user/:id', function(req, res, next) {
    controller.getUserPost(req.params.id)
        .then( (list) => {
            response.success(req, res, list, 200);
        })
        .catch(next);
});

router.get('/:id', function (req, res, next) {
    controller.get(req.params.id)
        .then((post) => {
            response.success(req, res, post, 200);
        })
        .catch(next);
});

router.post('/', secure('isUser'), function (req, res, next) {
    let postParams = {
        post: req.body.post,
        text: req.body.text,
        user_id: req.user.id
    };
    controller.set(postParams)
        .then( (result) => {
            response.success(req, res, result, 201);
        })
        .catch(next);
});

router.put('/', secure('isUser'), function (req, res, next) {
    controller.set(req.body)
        .then( (result) => {
            response.success(req, res, result, 200);
        })
        .catch(next);
});

router.delete('/:postId', secure('isUser'), function(req, res, next) {
    controller.remove(req.params.postId)
        .then( (flag) => {
            response.success(req, res, flag, 200);
        })
        .catch(next);
})

module.exports = router;