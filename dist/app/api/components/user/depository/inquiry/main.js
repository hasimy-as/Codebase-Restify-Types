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
var http_code_1 = require("../../../../../lib/http_code");
var logger_1 = __importDefault(require("../../../../../helpers/logger"));
var wrapper_1 = __importDefault(require("../../../../../helpers/wrapper"));
var query_1 = __importDefault(require("./query"));
var User = /** @class */ (function () {
    function User(db) {
        this.qProcess = new query_1["default"](db);
    }
    User.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, user, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = 'User-getUsers';
                        return [4 /*yield*/, this.qProcess.findMany()];
                    case 1:
                        user = _a.sent();
                        if (user.err) {
                            logger_1["default"].error(ctx, 'Cannot get all users.', user.err);
                            return [2 /*return*/, wrapper_1["default"].error('error', 'Cannot get all users!', http_code_1.CODE.INTERNAL_ERROR)];
                        }
                        data = user.data;
                        return [2 /*return*/, wrapper_1["default"].data(data, '', http_code_1.CODE.SUCCESS)];
                }
            });
        });
    };
    User.prototype.getUserById = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, user, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = 'User-getUserById';
                        return [4 /*yield*/, this.qProcess.findOne({ userId: payload.userId })];
                    case 1:
                        user = _a.sent();
                        if (user.err) {
                            logger_1["default"].error(ctx, 'User not found', user.err);
                            return [2 /*return*/, wrapper_1["default"].error('error', 'User not found!', http_code_1.CODE.NOT_FOUND)];
                        }
                        data = user.data;
                        return [2 /*return*/, wrapper_1["default"].data(data, '', http_code_1.CODE.SUCCESS)];
                }
            });
        });
    };
    return User;
}());
exports["default"] = User;
