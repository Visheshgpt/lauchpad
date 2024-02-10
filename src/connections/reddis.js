const Redis = require("ioredis");
const config = require("../config/config");
const redisClient = new Redis({
    port: config.redis.port,
    host: config.redis.host,
    password: config.redis.password,
});


module.exports = {
    redisClient
}