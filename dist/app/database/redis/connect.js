"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.myPool = void 0;
var redis_1 = __importDefault(require("redis"));
var genericPool = require('generic-pool');
var config = require('../../config/config');
var myPool = function () {
    return genericPool.createPool({
        create: function () {
            return redis_1["default"].createClient(config.get('/redis'));
        },
        destroy: function (client) {
            client.quit();
        }
    }, {
        max: 10,
        min: 2,
        idleTimeoutMillis: 1000
    });
};
exports.myPool = myPool;
