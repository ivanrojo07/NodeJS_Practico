const jwt = require('jsonwebtoken');
const error = require('../utils/error');
const SECRET = process.env.SECRET || "secreto";
function sign(data) {
    return jwt.sign(JSON.parse(JSON.stringify(data)), SECRET);
}
const check = {
    own: function (req, ownerId) {
        const decoded = decodeHeader(req);
        console.log(decoded);
        if(decoded.id != ownerId) {
            throw error('Unauthorized', 401);
        }

        //comprobar si es o no propio
    },
    logged: function (req) {
        const decoded = decodeHeader(req)
        if(!decoded) throw error('Invalid Token', 401);
    }
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    return decoded;
}

function getToken (auth) {
    if(!auth) {
        throw new Error('No viene el token');
    }
    if(auth.indexOf('Bearer ') === -1){
        throw new Error('Header Invalido')
    }
    else {
        let token = auth.replace('Bearer ','');
        return token
    }
}

function verify(token) {
    return jwt.verify(token, SECRET)
}

module.exports = {
    sign,
    check,
}
