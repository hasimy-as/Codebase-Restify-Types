"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var winston_1 = __importDefault(require("winston"));
var logger = new winston_1["default"].Logger({
    transports: [new winston_1["default"].transports.Console({
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});
var info = function (context, message, scope) { return logger.info("context=" + context + ", scope=" + scope + ", message=" + message); };
var error = function (context, message, scope) { return logger.error("context=" + context + ", scope=" + scope + ", message=" + message); };
exports["default"] = {
    info: info,
    error: error
};
