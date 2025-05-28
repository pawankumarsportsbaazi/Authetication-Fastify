const redis = require("ioredis");
const util = require("util");

// bluebird.promisifyAll(redis.RedisClient.prototype);
const client = new redis(6379, 'localhost');
// const client = redis.createClient({socket: {port: 6379, host: Config.REDIS_HOST}});
client.on('connect', () => {
    console.log("Connected to Redis")
})
const getAsync = util.promisify(client.get).bind(client);
const setAsync = util.promisify(client.set).bind(client);
const incr = util.promisify(client.incr).bind(client);
const zrevrange = util.promisify(client.zrange).bind(client);
const saddAsync = util.promisify(client.sadd).bind(client);
const smembersAsync = util.promisify(client.smembers).bind(client);
const delAsync = util.promisify(client.del).bind(client);
const hGet = util.promisify(client.hget).bind(client);
const hSet = util.promisify(client.hset).bind(client);
const hDel = util.promisify(client.hdel).bind(client);
const scan = util.promisify(client.scan).bind(client);

//Redis lists functions start
const lrangeAsync = util.promisify(client.lrange).bind(client); // Retrieve all elements in the list
//Redis lists functions end

const setKeyExpire = util.promisify(client.expire).bind(client);
// if (process.env.NODE_ENV == 'production') {
//     client = redis.createClient(6379, Config.REDIS_HOST);
// }
// let connList = []
// for (let index = 0; index < process.env.REDIS_CONNECTION_LIMIT; index++) {
//     connList.push(redis.createClient(6379, Config.REDIS_HOST))
// }
// let counter = 0;
// function getRedisConn() {
//     counter++;
//     if (connList.length == counter) counter = 0;
//     return connList[counter]
// }
// module.exports = getRedisConn();
module.exports.getAsync = getAsync;
module.exports.set = setAsync;
module.exports.incr = incr;
module.exports.zrevrange = zrevrange;
module.exports.saddAsync = saddAsync;
module.exports.smembersAsync = smembersAsync;
module.exports.delAsync = delAsync;
module.exports.hGet = hGet;
module.exports.hSet = hSet;
module.exports.hDel = hDel;
module.exports.scan = scan;
module.exports.setKeyExpire = setKeyExpire;
module.exports.lrangeAsync = lrangeAsync;
module.exports.client = client;