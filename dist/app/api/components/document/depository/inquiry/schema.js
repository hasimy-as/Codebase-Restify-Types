"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var getDocumentById = joi_1["default"].object({
    documentId: joi_1["default"].string().guid().required()
});
exports["default"] = {
    getDocumentById: getDocumentById
};
