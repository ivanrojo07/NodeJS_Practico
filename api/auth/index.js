const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || "secreto";
function sign(data) {
    return jwt.sign(data, SECRET);
}

module.exports = {
    sign,
}
