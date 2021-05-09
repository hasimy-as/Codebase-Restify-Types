"use strict";
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
exports.init = exports.getConnection = void 0;
var mongodb_1 = __importDefault(require("mongodb"));
var validate_js_1 = __importDefault(require("validate.js"));
var logger_1 = __importDefault(require("../../helpers/logger"));
var wrapper_1 = __importDefault(require("../../helpers/wrapper"));
var http_code_1 = require("../../lib/http_code");
var config = require('../../config/config');
var ctx = 'Db-connection';
var connPool = [];
var conn = function () {
    var connState = { index: 0, config: '', db: null };
    return connState;
};
var createConnection = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var options, mongoConnect, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = {
                    poolSize: 50,
                    keepAlive: 15000,
                    socketTimeoutMS: 15000,
                    connectTimeoutMS: 15000,
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, mongodb_1["default"].connect(config, options)];
            case 2:
                mongoConnect = _a.sent();
                logger_1["default"].info(ctx, 'Established!', 'Database connection');
                return [2 /*return*/, wrapper_1["default"].data(mongoConnect)];
            case 3:
                err_1 = _a.sent();
                logger_1["default"].error(ctx, err_1, 'Error!');
                wrapper_1["default"].error(err_1, err_1.message, http_code_1.CODE.SERVICE_UNAVAILABLE);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var addConnectionPool = function () {
    var connection = conn();
    connection.config = config.get('/mongo');
    return connPool.push(connection);
};
var createConnectionPool = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        connPool.map(function (currentConnection, index) { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, createConnection(currentConnection.config)];
                    case 1:
                        result = _a.sent();
                        if (result.err) {
                            connPool[index].db = currentConnection;
                        }
                        else {
                            connPool[index].db = result.data;
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
var isExistConnection = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var state;
    return __generator(this, function (_a) {
        state = {};
        connPool.map(function (currentConnection) {
            if (currentConnection.config === config) {
                state = currentConnection;
            }
            return state;
        });
        if (validate_js_1["default"].isEmpty(state))
            wrapper_1["default"].error('Error connection', 'Connection must be created', http_code_1.CODE.NOT_FOUND);
        return [2 /*return*/, wrapper_1["default"].data(state)];
    });
}); };
var isConnected = function (state) { return __awaiter(void 0, void 0, void 0, function () {
    var connection;
    return __generator(this, function (_a) {
        connection = state.db;
        if (!connection.isConnected()) {
            wrapper_1["default"].error('Error connection', 'Connection must be created', http_code_1.CODE.NOT_FOUND, state);
        }
        return [2 /*return*/, wrapper_1["default"].data(state)];
    });
}); };
// Exported functions
var getConnection = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var connectionIndex, checkConnection, result, state;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                checkConnection = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result, connection;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, isExistConnection(config)];
                            case 1:
                                result = _a.sent();
                                if (result.err) {
                                    return [2 /*return*/, result];
                                }
                                return [4 /*yield*/, isConnected(result.data)];
                            case 2:
                                connection = _a.sent();
                                connectionIndex = result.data.index;
                                return [2 /*return*/, connection];
                        }
                    });
                }); };
                return [4 /*yield*/, checkConnection()];
            case 1:
                result = _a.sent();
                if (!result.err) return [3 /*break*/, 3];
                return [4 /*yield*/, createConnection(config)];
            case 2:
                state = _a.sent();
                if (state.err) {
                    wrapper_1["default"].data(connPool[connectionIndex]);
                }
                connPool[connectionIndex].db = state.data;
                return [2 /*return*/, wrapper_1["default"].data(connPool[connectionIndex])];
            case 3: return [2 /*return*/, result];
        }
    });
}); };
exports.getConnection = getConnection;
var init = function () {
    addConnectionPool();
    createConnectionPool();
};
exports.init = init;
