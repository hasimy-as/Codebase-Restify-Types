"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var fields_1 = require("../../../../../lib/fields");
var createUser = joi_1["default"].object({
    roles: joi_1["default"].string()["default"](fields_1.ROLES.USER).optional(),
    name: joi_1["default"].string().required(),
    address: joi_1["default"].string().required(),
    email: joi_1["default"].string().email().max(50).required(),
    password: joi_1["default"].string().min(6).required()
});
var loginUser = joi_1["default"].object({
    email: joi_1["default"].string().email().max(50).required(),
    password: joi_1["default"].string().min(6).required()
});
var updateUser = joi_1["default"].object({
    userId: joi_1["default"].string().guid().required(),
    name: joi_1["default"].string().required(),
    address: joi_1["default"].string().required(),
    email: joi_1["default"].string().email().max(50).required(),
    password: joi_1["default"].string().min(6).required()
});
var deleteUser = joi_1["default"].object({
    userId: joi_1["default"].string().guid().required()
});
exports["default"] = {
    loginUser: loginUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
};
