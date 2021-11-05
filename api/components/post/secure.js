const auth = require('../../auth');

module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        let owner = null
        switch(action) {
            case 'isUser':
                auth.check.logged(req);
                next();
                break;
            default:
                next();
        }
    }

    return middleware
}