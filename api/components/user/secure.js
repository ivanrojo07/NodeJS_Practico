const auth = require('../../auth');

module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        let owner = null
        switch(action) {
            case 'update':
                owner = req.body.id;
                auth.check.own(req, owner)
                next();
                break;
            case 'follow':
                auth.check.logged(req);
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