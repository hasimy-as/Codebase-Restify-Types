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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var validate_js_1 = __importDefault(require("validate.js"));
var wrapper_1 = __importDefault(require("../../helpers/wrapper"));
var commands_1 = __importDefault(require("../../database/redis/commands"));
var http_code_1 = require("../../lib/http_code");
;
var config = require('../../config/config');
var client = new commands_1["default"](config);
var getKey = function (keyPath) { return fs_1["default"].readFileSync(keyPath, 'utf8'); };
var algorithm = 'RS256';
var generateToken = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var privateKey, token;
    return __generator(this, function (_a) {
        privateKey = getKey(config.get('/privateKey'));
        token = jsonwebtoken_1["default"].sign(payload, privateKey, {
            algorithm: 'RS256',
            issuer: 'hasimy-as',
            expiresIn: '24h'
        });
        return [2 /*return*/, token];
    });
}); };
var getToken = function (headers) {
    if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        }
    }
    return undefined;
};
var verifyToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result, publicKey, token, decodedToken, _a, redis, redisErr, error_1, opts;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                result = {
                    data: null
                };
                publicKey = fs_1["default"].readFileSync(config.get('/publicKey'), 'utf8');
                token = getToken(req.headers);
                if (!token) {
                    return [2 /*return*/, wrapper_1["default"].response(res, 'fail', result, 'Invalid token!', http_code_1.CODE.FORBIDDEN)];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, jsonwebtoken_1["default"].verify(token, publicKey, algorithm)];
            case 2:
                decodedToken = _b.sent();
                return [4 /*yield*/, client.get("" + decodedToken.key + decodedToken._id)];
            case 3:
                _a = _b.sent(), redis = _a.data, redisErr = _a.err;
                if (redisErr || validate_js_1["default"].isEmpty(redis)) {
                    return [2 /*return*/, wrapper_1["default"].response(res, 'fail', result, 'Access token expired!', http_code_1.CODE.UNAUTHORIZED)];
                }
                decodedToken = JSON.parse(redis);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                if (error_1 instanceof jsonwebtoken_1["default"].TokenExpiredError) {
                    return [2 /*return*/, wrapper_1["default"].response(res, 'fail', result, 'Access token expired!', http_code_1.CODE.UNAUTHORIZED)];
                }
                return [2 /*return*/, wrapper_1["default"].response(res, 'fail', result, 'Token is not valid!', http_code_1.CODE.UNAUTHORIZED)];
            case 5:
                opts = __assign(__assign({}, decodedToken), { authorization: req.headers.authorization });
                req.opts = opts;
                next();
                return [2 /*return*/];
        }
    });
}); };
exports["default"] = {
    generateToken: generateToken,
    verifyToken: verifyToken
};
