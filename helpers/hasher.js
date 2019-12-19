const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

let myHash = null;
    bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
        myHash = hash;
        console.log(hash);
        bcrypt.compare(myPlaintextPassword, myHash, function(err, res) {
            console.log(res);
        })
    })


// module.exports = hasher;