const remote = require('./remote');

module.exports = new remote(process.env.CACHE_SERVICE_HOST, process.env.CACHE_SERVICE_PORT)