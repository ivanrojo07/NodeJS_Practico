const express = require('express');
const user = require('../components/user/router');
const auth = require('../components/auth/router');
const routes = function(server) {
    server.use('/api/user',user);
    server.use('/api/auth',auth);
}

module.exports = routes