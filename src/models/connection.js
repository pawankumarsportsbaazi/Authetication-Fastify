const userDbb = require('./../utils/db');

class connection{
    constructor(ccDb = userDbb){
        console.log(ccDb)
        this.userDb = userDbb;
        this.table = 'employee';
    }
}

module.exports = connection;