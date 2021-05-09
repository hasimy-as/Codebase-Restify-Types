"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var index_1 = require("./app/api/index");
var logger_1 = __importDefault(require("./app/helpers/logger"));
var mongoConnect = require('./app/database/mongodb/connect');
var app = new index_1.Application;
app.server.listen(process.env.PORT || 5000, function (err) {
    var ctx = 'App-listen';
    if (err)
        throw logger_1["default"].error(ctx, err, 'Server');
    mongoConnect.init();
    logger_1["default"].info(ctx, 'Connected!', 'Server');
});
