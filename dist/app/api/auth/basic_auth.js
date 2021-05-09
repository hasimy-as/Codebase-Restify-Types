"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var passport_1 = __importDefault(require("passport"));
var passport_http_1 = require("passport-http");
var authentication_1 = __importDefault(require("./authentication"));
passport_1["default"].use(new passport_http_1.BasicStrategy(function (username, password, cb) {
    authentication_1["default"].findByUsername(username, function (user) {
        if (!user) {
            return cb(null, false);
        }
        if (!user.isValidPassword(password)) {
            return cb(null, false);
        }
        return cb(null, user);
    });
}));
var isAuthenticated = passport_1["default"].authenticate('basic', { session: false });
var init = function () { return passport_1["default"].initialize(); };
exports["default"] = {
    isAuthenticated: isAuthenticated,
    init: init
};
