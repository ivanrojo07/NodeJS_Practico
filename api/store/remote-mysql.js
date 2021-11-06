const remote = require('./remote');

module.exports = new remote(process.env.MYSQL_SERVICE_HOST, process.env.MYSQL_SERVICE_PORT)