"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var validate_js_1 = __importDefault(require("validate.js"));
var logger_1 = __importDefault(require("../../helpers/logger"));
var wrapper_1 = __importDefault(require("../../helpers/wrapper"));
var http_code_1 = require("../../lib/http_code");
var mongoConnect = __importStar(require("./connect"));
var Commands = /** @class */ (function () {
    function Commands(config) {
        this.config = config;
    }
    Commands.prototype.setCollection = function (collectionName) {
        this.collectionName = collectionName;
    };
    Commands.prototype.getDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, dbName;
            return __generator(this, function (_a) {
                config = this.config.split('/').pop();
                dbName = validate_js_1["default"].isEmpty(this.dbName) ? config : this.dbName;
                return [2 /*return*/, dbName];
            });
        });
    };
    Commands.prototype.insertOne = function (document) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, dbName, result, cacheConnection, connection, db, record, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = 'Mongodb-insertOne';
                        return [4 /*yield*/, this.getDatabase()];
                    case 1:
                        dbName = _a.sent();
                        return [4 /*yield*/, mongoConnect.getConnection(this.config)];
                    case 2:
                        result = _a.sent();
                        if (result.err) {
                            logger_1["default"].error(ctx, result.err.message, 'Error mongodb connection');
                            return [2 /*return*/, result];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        cacheConnection = result.data.db;
                        connection = cacheConnection.db(dbName);
                        db = connection.collection(this.collectionName);
                        return [4 /*yield*/, db.insertOne(document)];
                    case 4:
                        record = _a.sent();
                        if (record.result.n !== 1) {
                            logger_1["default"].error(ctx, http_code_1.CODE.BAD_REQUEST, 'Database error');
                            return [2 /*return*/, wrapper_1["default"].error('Failed to insert data')];
                        }
                        return [2 /*return*/, wrapper_1["default"].data(document)];
                    case 5:
                        err_1 = _a.sent();
                        logger_1["default"].error(ctx, err_1.message, 'Error insert data in mongodb');
                        return [2 /*return*/, wrapper_1["default"].error("Insert One => " + err_1.message)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Commands.prototype.findMany = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, dbName, result, cacheConnection, connection, db, record, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = 'Mongodb-findMany';
                        return [4 /*yield*/, this.getDatabase()];
                    case 1:
                        dbName = _a.sent();
                        return [4 /*yield*/, mongoConnect.getConnection(this.config)];
                    case 2:
                        result = _a.sent();
                        if (result.err) {
                            logger_1["default"].error(ctx, result.err.message, 'Error mongodb connection');
                            return [2 /*return*/, result];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        cacheConnection = result.data.db;
                        connection = cacheConnection.db(dbName);
                        db = connection.collection(this.collectionName);
                        return [4 /*yield*/, db.find(params).toArray()];
                    case 4:
                        record = _a.sent();
                        if (validate_js_1["default"].isEmpty(record)) {
                            return [2 /*return*/, wrapper_1["default"].error('Data not found', http_code_1.CODE.NOT_FOUND)];
                        }
                        return [2 /*return*/, wrapper_1["default"].data(record)];
                    case 5:
                        err_2 = _a.sent();
                        logger_1["default"].error(ctx, err_2.message, 'Error find data in mongodb');
                        return [2 /*return*/, wrapper_1["default"].error("Find Many => " + err_2.message)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Commands.prototype.findOne = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, dbName, result, cacheConnection, connection, db, record, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = 'Mongodb-findOne';
                        return [4 /*yield*/, this.getDatabase()];
                    case 1:
                        dbName = _a.sent();
                        return [4 /*yield*/, mongoConnect.getConnection(this.config)];
                    case 2:
                        result = _a.sent();
                        if (result.err) {
                            logger_1["default"].error(ctx, result.err.message, 'Error mongodb connection');
                            return [2 /*return*/, result];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        cacheConnection = result.data.db;
                        connection = cacheConnection.db(dbName);
                        db = connection.collection(this.collectionName);
                        return [4 /*yield*/, db.findOne(params)];
                    case 4:
                        record = _a.sent();
                        if (validate_js_1["default"].isEmpty(record)) {
                            return [2 /*return*/, wrapper_1["default"].error('Data not found', http_code_1.CODE.NOT_FOUND)];
                        }
                        return [2 /*return*/, wrapper_1["default"].data(record)];
                    case 5:
                        err_3 = _a.sent();
                        logger_1["default"].error(ctx, err_3.message, 'Error find data in mongodb');
                        return [2 /*return*/, wrapper_1["default"].error("Find One => " + err_3.message)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Commands.prototype.updateOne = function (params, query) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, dbName, result, cacheConnection, connection, db, data, nModified, record, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = 'Mongodb-updateOne';
                        return [4 /*yield*/, this.getDatabase()];
                    case 1:
                        dbName = _a.sent();
                        return [4 /*yield*/, mongoConnect.getConnection(this.config)];
                    case 2:
                        result = _a.sent();
                        if (result.err) {
                            logger_1["default"].error(ctx, result.err.message, 'Error mongodb connection');
                            return [2 /*return*/, result];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        cacheConnection = result.data.db;
                        connection = cacheConnection.db(dbName);
                        db = connection.collection(this.collectionName);
                        return [4 /*yield*/, db.updateOne(params, query, {
                                upsert: true
                            })];
                    case 4:
                        data = _a.sent();
                        if (!(data.result.nModified >= 0)) return [3 /*break*/, 6];
                        nModified = data.result.nModified;
                        return [4 /*yield*/, this.findOne(params)];
                    case 5:
                        record = _a.sent();
                        if (nModified === 0) {
                            return [2 /*return*/, wrapper_1["default"].data(record.data)];
                        }
                        return [2 /*return*/, wrapper_1["default"].data(record.data)];
                    case 6: return [2 /*return*/, wrapper_1["default"].error('Failed update data')];
                    case 7:
                        err_4 = _a.sent();
                        logger_1["default"].error(ctx, err_4.message, 'Error update data in mongodb');
                        return [2 /*return*/, wrapper_1["default"].error("Update One => " + err_4.message)];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Commands.prototype.deleteOne = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, dbName, result, cacheConnection, connection, db, record, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = 'Mongodb-deleteOne';
                        return [4 /*yield*/, this.getDatabase()];
                    case 1:
                        dbName = _a.sent();
                        return [4 /*yield*/, mongoConnect.getConnection(this.config)];
                    case 2:
                        result = _a.sent();
                        if (result.err) {
                            logger_1["default"].error(ctx, result.err.message, 'Error mongodb connection');
                            return [2 /*return*/, result];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        cacheConnection = result.data.db;
                        connection = cacheConnection.db(dbName);
                        db = connection.collection(this.collectionName);
                        return [4 /*yield*/, db.deleteOne(params)];
                    case 4:
                        record = _a.sent();
                        if (validate_js_1["default"].isEmpty(record)) {
                            return [2 /*return*/, wrapper_1["default"].error('Data not found', http_code_1.CODE.NOT_FOUND)];
                        }
                        return [2 /*return*/, wrapper_1["default"].data(record)];
                    case 5:
                        err_5 = _a.sent();
                        logger_1["default"].error(ctx, err_5.message, 'Error delete data in mongodb');
                        return [2 /*return*/, wrapper_1["default"].error("Delete One => " + err_5.message)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Commands.prototype.aggregate = function (parameter) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, dbName, result, cacheConnection, connection, db, record, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = 'Mongodb-aggregate';
                        return [4 /*yield*/, this.getDatabase()];
                    case 1:
                        dbName = _a.sent();
                        return [4 /*yield*/, mongoConnect.getConnection(this.config)];
                    case 2:
                        result = _a.sent();
                        if (result.err) {
                            logger_1["default"].error(ctx, result.err.message, 'Error mongodb connection');
                            return [2 /*return*/, result];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        cacheConnection = result.data.db;
                        connection = cacheConnection.db(dbName);
                        db = connection.collection(this.collectionName);
                        return [4 /*yield*/, db.aggregate(parameter, { collation: { locale: 'en' } }).toArray()];
                    case 4:
                        record = _a.sent();
                        if (validate_js_1["default"].isEmpty(record)) {
                            return [2 /*return*/, wrapper_1["default"].error('Data not found', http_code_1.CODE.NOT_FOUND)];
                        }
                        return [2 /*return*/, wrapper_1["default"].data(record)];
                    case 5:
                        err_6 = _a.sent();
                        logger_1["default"].error(ctx, err_6.message, 'Error find and aggregate data in mongodb');
                        return [2 /*return*/, wrapper_1["default"].error("Aggregate => " + err_6.message)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Commands;
}());
exports["default"] = Commands;
