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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var uuid_1 = require("uuid");
var fields_1 = require("../../../../../lib/fields");
var http_code_1 = require("../../../../../lib/http_code");
var jwt_auth_1 = __importDefault(require("../../../../auth/jwt_auth"));
var crypt_1 = __importDefault(require("../../../../../helpers/crypt"));
var logger_1 = __importDefault(require("../../../../../helpers/logger"));
var wrapper_1 = __importDefault(require("../../../../../helpers/wrapper"));
var command_1 = __importDefault(require("./command"));
var query_1 = __importDefault(require("../inquiry/query"));
var commands_1 = __importDefault(require("../../../../../database/redis/commands"));
var User = /** @class */ (function () {
    function User(db) {
        this.client = new commands_1["default"](db);
        this.process = new command_1["default"](db);
        this.qProcess = new query_1["default"](db);
    }
    User.prototype.createUser = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, opts, payloadVal, findEmail, password, _a, user, userErr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ctx = 'User-createUser';
                        opts = payload.opts, payloadVal = __rest(payload, ["opts"]);
                        if (opts.roles !== fields_1.ROLES.SUPER_ADMIN) {
                            logger_1["default"].error(ctx, 'This account is not an admin.', 'Error');
                            return [2 /*return*/, wrapper_1["default"].error('fail', 'This account is not an admin!', http_code_1.CODE.UNAUTHORIZED)];
                        }
                        return [4 /*yield*/, this.qProcess.findOne({ email: payload.email })];
                    case 1:
                        findEmail = _b.sent();
                        if (findEmail.code === http_code_1.CODE.SUCCESS) {
                            logger_1["default"].error(ctx, 'Email has been used.', 'Error');
                            return [2 /*return*/, wrapper_1["default"].error('error', 'Email has been used!', http_code_1.CODE.BAD_REQUEST)];
                        }
                        return [4 /*yield*/, crypt_1["default"].encrypt(payload.password)];
                    case 2:
                        password = _b.sent();
                        return [4 /*yield*/, this.process.insertOne(__assign(__assign({ userId: uuid_1.v4() }, payloadVal), { password: password, createdAt: new Date().toISOString() }))];
                    case 3:
                        _a = _b.sent(), user = _a.data, userErr = _a.err;
                        if (userErr) {
                            logger_1["default"].error(ctx, 'Failed to create user.', userErr);
                            return [2 /*return*/, wrapper_1["default"].error('fail', 'Failed to create user!', http_code_1.CODE.INTERNAL_ERROR)];
                        }
                        return [2 /*return*/, wrapper_1["default"].data(user, '', http_code_1.CODE.SUCCESS)];
                }
            });
        });
    };
    User.prototype.loginUser = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, _a, user, userErr, userData, password, payloadVal, userPassword, token, redis, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ctx = 'User-loginUser';
                        return [4 /*yield*/, this.qProcess.findOne({ email: payload.email })];
                    case 1:
                        _a = _b.sent(), user = _a.data, userErr = _a.err;
                        if (userErr) {
                            logger_1["default"].error(ctx, 'User not found.', userErr);
                            return [2 /*return*/, wrapper_1["default"].error('error', 'User not found!', http_code_1.CODE.NOT_FOUND)];
                        }
                        if (!(user.roles === fields_1.ROLES.USER)) return [3 /*break*/, 5];
                        userData = {};
                        password = user.password, payloadVal = __rest(user, ["password"]);
                        return [4 /*yield*/, crypt_1["default"].decrypt(password)];
                    case 2:
                        userPassword = _b.sent();
                        if (payload.password === userPassword) {
                            userData = {
                                userId: payloadVal.userId,
                                name: payloadVal.name,
                                email: payloadVal.email,
                                address: payloadVal.address,
                                roles: payloadVal.roles,
                                expiresIn: 864000,
                                key: fields_1.REDIS_KEY.USER
                            };
                        }
                        else {
                            logger_1["default"].error(ctx, 'Password incorrect.', 'Error');
                            return [2 /*return*/, wrapper_1["default"].error('error', 'Password incorrect!', http_code_1.CODE.BAD_REQUEST)];
                        }
                        return [4 /*yield*/, jwt_auth_1["default"].generateToken(userData)];
                    case 3:
                        token = _b.sent();
                        return [4 /*yield*/, this.client.setExpire("" + userData.key + userData._id, userData, 'EX', userData.expiresIn)];
                    case 4:
                        redis = _b.sent();
                        if (token.err || redis.err) {
                            return [2 /*return*/, wrapper_1["default"].error('fail', 'Login failed!', http_code_1.CODE.INTERNAL_ERROR)];
                        }
                        result = __assign(__assign({}, userData), { accessToken: token });
                        return [2 /*return*/, wrapper_1["default"].data(result, 'Logged in', http_code_1.CODE.SUCCESS)];
                    case 5: return [2 /*return*/, wrapper_1["default"].error('fail', 'Account is not a user!', http_code_1.CODE.UNAUTHORIZED)];
                }
            });
        });
    };
    User.prototype.updateUser = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, opts, payloadVal, findUser, password, _a, user, userErr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ctx = 'User-updateUser';
                        opts = payload.opts, payloadVal = __rest(payload, ["opts"]);
                        if (opts.roles !== fields_1.ROLES.USER) {
                            logger_1["default"].error(ctx, 'This account is not a user.', 'Error');
                            return [2 /*return*/, wrapper_1["default"].error('fail', 'This account is not a user!', http_code_1.CODE.UNAUTHORIZED)];
                        }
                        return [4 /*yield*/, this.qProcess.findOne({ userId: payload.userId })];
                    case 1:
                        findUser = _b.sent();
                        if (findUser.err) {
                            logger_1["default"].error(ctx, 'User not found.', findUser.err);
                            return [2 /*return*/, wrapper_1["default"].error('error', 'User not found!', http_code_1.CODE.NOT_FOUND)];
                        }
                        return [4 /*yield*/, crypt_1["default"].encrypt(payloadVal.password)];
                    case 2:
                        password = _b.sent();
                        return [4 /*yield*/, this.process.updateOne({ userId: payload.userId }, {
                                $set: __assign(__assign({}, payloadVal), { password: password, updatedAt: new Date().toISOString() })
                            })];
                    case 3:
                        _a = _b.sent(), user = _a.data, userErr = _a.err;
                        if (userErr) {
                            logger_1["default"].error(ctx, 'Failed to update user.', userErr);
                            return [2 /*return*/, wrapper_1["default"].error('fail', 'Failed to update user!', http_code_1.CODE.INTERNAL_ERROR)];
                        }
                        return [2 /*return*/, wrapper_1["default"].data(user, '', http_code_1.CODE.SUCCESS)];
                }
            });
        });
    };
    User.prototype.deleteUser = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, opts, findUser, _a, user, userErr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ctx = 'User-deleteUser';
                        opts = payload.opts;
                        if (opts.roles !== fields_1.ROLES.SUPER_ADMIN) {
                            logger_1["default"].error(ctx, 'This account is not an admin.', 'Error');
                            return [2 /*return*/, wrapper_1["default"].error('fail', 'This account is not an admin!', http_code_1.CODE.UNAUTHORIZED)];
                        }
                        return [4 /*yield*/, this.qProcess.findOne({ userId: payload.userId })];
                    case 1:
                        findUser = _b.sent();
                        if (findUser.err) {
                            logger_1["default"].error(ctx, 'User not found', findUser.err);
                            return [2 /*return*/, wrapper_1["default"].error('error', 'User not found!', http_code_1.CODE.NOT_FOUND)];
                        }
                        return [4 /*yield*/, this.process.deleteOne({ userId: payload.userId })];
                    case 2:
                        _a = _b.sent(), user = _a.data, userErr = _a.err;
                        if (userErr) {
                            logger_1["default"].error(ctx, 'Failed to delete user.', userErr);
                            return [2 /*return*/, wrapper_1["default"].error('fail', 'Failed to delete user!', http_code_1.CODE.INTERNAL_ERROR)];
                        }
                        return [2 /*return*/, wrapper_1["default"].data(user, '', http_code_1.CODE.SUCCESS)];
                }
            });
        });
    };
    return User;
}());
exports["default"] = User;
