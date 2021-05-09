"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var createDocument = joi_1["default"].object({
    title: joi_1["default"].string().max(60).required(),
    about: joi_1["default"].string().max(250).required(),
    document: joi_1["default"].string().required()
});
var updateDocument = joi_1["default"].object({
    documentId: joi_1["default"].string().guid().required(),
    title: joi_1["default"].string().max(60).required(),
    about: joi_1["default"].string().max(250).required(),
    document: joi_1["default"].string().required()
});
var deleteDocument = joi_1["default"].object({
    documentId: joi_1["default"].string().guid().required()
});
exports["default"] = {
    createDocument: createDocument,
    updateDocument: updateDocument,
    deleteDocument: deleteDocument
};
