const userTable = require('./../models');

async function updateUser(req, res){
    try{
        const body = req.body;
        console.log(body);

        const ans = await userTable.users.updateUser(body);
        if(!ans){
            res.code(400);
            return {
                message: '!Something went wrong!',
            }
        }
        return {
            message: 'success'
        };
    }catch(error){
        console.log(error);
        res.code(400);
        return {
            message: 'Something went wrong!',
        }
    }
}

module.exports = { updateUser };