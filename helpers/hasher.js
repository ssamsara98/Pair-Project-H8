const bcrypt = require('bcrypt');
const saltRounds = 10;

function hasher(pass) {
    const result = bcrypt.hashSync(pass, saltRounds);
    return result;
}

module.exports = hasher;