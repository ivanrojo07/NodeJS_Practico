const auth = require('../../auth');

module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        let owner = null
        switch(action) {
            case 'get':
                owner = req.params.id;
                auth.check.own(req, owner)
                next();
                break;
            case 'delete':
                owner = req.params.id;
                auth.check.own(req, owner)
                next();
                break;
            default:
                next();
        }
    }

    return middleware
}