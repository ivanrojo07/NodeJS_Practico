const express = require('express');
const user = require('../components/user/router');
const auth = require('../components/auth/router');
const post = require('../components/post/router');
const routes = function(server) {
    server.use('/api/user',user);
    server.use('/api/auth',auth);
    server.use('/api/post',post);
}

module.exports = routes