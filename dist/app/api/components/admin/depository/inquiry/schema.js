"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var getAdminById = joi_1["default"].object({
    adminId: joi_1["default"].string().guid().required()
});
exports["default"] = {
    getAdminById: getAdminById
};
