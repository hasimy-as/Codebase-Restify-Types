"use strict";
exports.__esModule = true;
var config = require('../../config/config');
var User = /** @class */ (function () {
    function User(username, password) {
        this.username = username;
        this.password = password;
    }
    User.prototype.isValidPassword = function (password) {
        return this.password === password;
    };
    User.findByUsername = function (username, cb) {
        var userDatas = config.get('/basicAuth');
        var userData;
        userData = userDatas.map(function (val) {
            if (val.username === username) {
                return val;
            }
            return '';
        });
        var user = new User(userData[0].username, userData[0].password);
        cb(user);
    };
    return User;
}());
exports["default"] = User;
