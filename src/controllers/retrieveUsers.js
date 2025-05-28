const userTable = require('../models');
const { client } = require('../utils/redis');
const logfmt = require('logfmt');
function getSomeEnvironmentData(req, res) {
    return {
        hostname: req.hostname,
        protocol: req.protocol,
        message:'Sucessfully retreived'
    };
}
async function retrieveUsers(req,res){
    try{
        console.log(logfmt.stringify(getSomeEnvironmentData(req, res)))
        const a = await client.get('allUsers');
        const allUsers = await userTable.users.fetchAllUsers();
        if(!allUsers){
            res.code(400);
            return {
                message: 'Something went wrong!',
            }
        }
        return {
            message: 'success',
            allUsers
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

async function findUser(req,res){
    try{
        const {id} = req.params;
        const user = await userTable.users.fetchUserById(id);
        if(!user){
            res.code(400);
            return {
                message: 'User not found!',
            }
        }
        return {
            message: 'success',
            user
        }
    }
    catch(error){
        console.log(error);
        res.code(400);
        return {
            message: 'Something went wrong!',
        }
    }
}

module.exports = { retrieveUsers, findUser };