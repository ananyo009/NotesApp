const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    enableReadyCheck: false,
    retryStrategy(times) {
        return Math.min(times * 200, 2000);
    }
});

redis.on('connect', () => {
    console.log('server connected to redis');
});

redis.on('error', (err) => {
    console.log('Redis connection error:', err.message);
});

module.exports = redis;