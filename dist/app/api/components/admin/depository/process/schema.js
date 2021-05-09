"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var fields_1 = require("../../../../../lib/fields");
var createAdmin = joi_1["default"].object({
    roles: joi_1["default"].string()["default"](fields_1.ROLES.SUPER_ADMIN).optional(),
    name: joi_1["default"].string().required(),
    address: joi_1["default"].string().required(),
    email: joi_1["default"].string().email().max(50).required(),
    password: joi_1["default"].string().min(6).required()
});
var loginAdmin = joi_1["default"].object({
    email: joi_1["default"].string().email().max(50).required(),
    password: joi_1["default"].string().min(6).required()
});
var updateAdmin = joi_1["default"].object({
    adminId: joi_1["default"].string().guid().required(),
    name: joi_1["default"].string().required(),
    address: joi_1["default"].string().required(),
    email: joi_1["default"].string().email().max(50).required(),
    password: joi_1["default"].string().min(6).required()
});
var deleteAdmin = joi_1["default"].object({
    adminId: joi_1["default"].string().guid().required()
});
exports["default"] = {
    loginAdmin: loginAdmin,
    createAdmin: createAdmin,
    updateAdmin: updateAdmin,
    deleteAdmin: deleteAdmin
};
