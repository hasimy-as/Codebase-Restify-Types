"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var uuid = require('uuid');
var ROLES = require('../../../../../lib/fields').ROLES;
var CODE = require('../../../../../lib/http_code').CODE;
var logger = require('../../../../../helpers/logger');
var wrapper = require('../../../../../helpers/wrapper');
var Command = require('./command');
var Query = require('../inquiry/query');
var Document = /** @class */ (function () {
    function Document(db) {
        this.process = new Command(db);
        this.qProcess = new Query(db);
    }
    Document.prototype.createDocument = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, opts, payloadVal, findDocument, _a, document, documentErr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ctx = 'Document-createDocument';
                        opts = payload.opts, payloadVal = __rest(payload, ["opts"]);
                        if (opts.roles !== ROLES.USER) {
                            logger.error(ctx, 'This account is not a user.', 'Error');
                            return [2 /*return*/, wrapper.error('fail', 'This account is not a user!', CODE.UNAUTHORIZED)];
                        }
                        return [4 /*yield*/, this.qProcess.findOne({ title: payload.title })];
                    case 1:
                        findDocument = _b.sent();
                        if (findDocument.code === CODE.SUCCESS) {
                            logger.error(ctx, 'Document with inserted title already exist.', 'Error');
                            return [2 /*return*/, wrapper.error('error', 'Document with inserted title already exist!', CODE.BAD_REQUEST)];
                        }
                        return [4 /*yield*/, this.process.insertOne(__assign(__assign({ documentId: uuid() }, payloadVal), { createdAt: new Date().toISOString(), createdBy: opts.userId }))];
                    case 2:
                        _a = _b.sent(), document = _a.data, documentErr = _a.err;
                        if (documentErr) {
                            logger.error(ctx, 'Failed to create document.', documentErr);
                            return [2 /*return*/, wrapper.error('fail', 'Failed to create document!', CODE.INTERNAL_ERROR)];
                        }
                        return [2 /*return*/, wrapper.data(document, '', CODE.SUCCESS)];
                }
            });
        });
    };
    Document.prototype.updateDocument = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, opts, findDocument, _a, document, documentErr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ctx = 'Document-updateDocument';
                        opts = payload.opts;
                        if (opts.roles !== ROLES.USER) {
                            logger.error(ctx, 'This account is not a user.', 'Error');
                            return [2 /*return*/, wrapper.error('fail', 'This account is not a user!', CODE.UNAUTHORIZED)];
                        }
                        return [4 /*yield*/, this.qProcess.findOne({ documentId: payload.documentId })];
                    case 1:
                        findDocument = _b.sent();
                        if (findDocument.err) {
                            logger.error(ctx, 'Document not found.', findDocument.err);
                            return [2 /*return*/, wrapper.error('error', 'Document not found!', CODE.NOT_FOUND)];
                        }
                        return [4 /*yield*/, this.process.updateOne({ documentId: payload.documentId }, { $set: {
                                    title: payload.title,
                                    about: payload.about,
                                    document: payload.document,
                                    updatedAt: new Date().toISOString(),
                                    updatedBy: opts.userId
                                } })];
                    case 2:
                        _a = _b.sent(), document = _a.data, documentErr = _a.err;
                        if (documentErr) {
                            logger.error(ctx, 'Failed to update document.', documentErr);
                            return [2 /*return*/, wrapper.error('fail', 'Failed to update document!', CODE.INTERNAL_ERROR)];
                        }
                        return [2 /*return*/, wrapper.data(document, '', CODE.SUCCESS)];
                }
            });
        });
    };
    Document.prototype.deleteDocument = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, opts, findDocument, _a, document, documentErr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ctx = 'Document-deleteDocument';
                        opts = payload.opts;
                        if (opts.roles !== ROLES.USER) {
                            logger.error(ctx, 'This account is not a user.', 'Error');
                            return [2 /*return*/, wrapper.error('fail', 'This account is not a user!', CODE.UNAUTHORIZED)];
                        }
                        return [4 /*yield*/, this.qProcess.findOne({ documentId: payload.documentId })];
                    case 1:
                        findDocument = _b.sent();
                        if (findDocument.err) {
                            logger.error(ctx, 'Document not found.', findDocument.err);
                            return [2 /*return*/, wrapper.error('error', 'Document not found!', CODE.NOT_FOUND)];
                        }
                        return [4 /*yield*/, this.process.deleteOne({ documentId: payload.documentId })];
                    case 2:
                        _a = _b.sent(), document = _a.data, documentErr = _a.err;
                        if (documentErr) {
                            logger.error(ctx, 'Failed to delete document.', documentErr);
                            return [2 /*return*/, wrapper.error('fail', 'Failed to delete document!', CODE.INTERNAL_ERROR)];
                        }
                        return [2 /*return*/, wrapper.data(document, '', CODE.SUCCESS)];
                }
            });
        });
    };
    return Document;
}());
exports["default"] = Document;
