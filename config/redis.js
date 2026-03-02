const {createClient} = require('redis');

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-16217.c263.us-east-1-2.ec2.cloud.redislabs.com',
        port: 16217
    }
});

module.exports = client;