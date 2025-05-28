const userTable = require('../models');

async function addUser(req,res){
    try{
        const body = req.body;
        console.log(body);

        const ans = await userTable.users.addUser(body);
        if (!ans) {
            res.code(400);
            return {
                message: '!Something went wrong!',
            }
        }
        res.code(201);
        return {
            message: 'user created successfully!'
        };
    }
    catch(error){
        console.log(error);
        res.code(400);
        return {
            message: 'Something went wrong!',
        }
    }
}

module.exports = { addUser };