"use strict";
require('dotenv').config();
var confidence = require('confidence');
var config = {
    port: process.env.PORT,
    mongo: process.env.MONGO_URI,
    basicAuth: [
        {
            username: process.env.BASIC_AUTH_USERNAME,
            password: process.env.BASIC_AUTH_PASSWORD
        }
    ],
    secretKey: process.env.SECRET_KEY,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    redis: process.env.REDIS_URL
};
var store = new confidence.Store(config);
exports.get = function (key) { return store.get(key); };
