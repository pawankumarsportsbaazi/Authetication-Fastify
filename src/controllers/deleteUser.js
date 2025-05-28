const userTable = require('../models');
function getSomeEnvironmentData(req, res) {
    return {
        baseUrl: req.baseUrl,
        hostname: req.hostname,
        protocol: req.protocol,
        name: req.params.name
    };
}

async function deleteUser(req,res){
    console.log(logfmt.stringify(getSomeEnvironmentData(req, res)))
    try{
        const id = req.params.id;
        const ans = await userTable.users.deleteUser(id);
        if(!ans){
            res.code(400);
            return {
                message: 'Something went wrong!',
            }
        }
        return {
            message: 'success'
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
module.exports = { deleteUser };