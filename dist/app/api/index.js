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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Application = void 0;
var restify = __importStar(require("restify"));
var wrapper_1 = __importDefault(require("../helpers/wrapper"));
var package_json_1 = __importDefault(require("../../package.json"));
var basic_auth_1 = __importDefault(require("./auth/basic_auth"));
var jwt_auth_1 = __importDefault(require("./auth/jwt_auth"));
var operator_1 = __importDefault(require("./components/admin/operator"));
function Application() {
    this.server = restify.createServer({
        name: package_json_1["default"].name,
        version: package_json_1["default"].version
    });
    this.server.serverKey = '';
    this.server.use(restify.plugins.acceptParser(this.server.acceptable));
    this.server.use(restify.plugins.queryParser());
    this.server.use(restify.plugins.bodyParser({
        multiples: true,
        mapParams: true
    }));
    this.server.use(restify.plugins.authorizationParser());
    this.server.opts('/\\.*/', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', req.header('Access-Control-Request-Method'));
        res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
        res.header('Access-Control-Expose-Headers', 'Authorization');
        res.header('Access-Control-Allow-Headers', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type,**Authorization**');
        res.send(200);
        return next();
    });
    this.server.use(basic_auth_1["default"].init());
    this.server.get('/', function (req, res) {
        wrapper_1["default"].response(res, 'success', wrapper_1["default"].data('Server'), 'This server is running properly');
    });
    // Admin
    this.server.get('/api/admin', jwt_auth_1["default"].verifyToken, operator_1["default"].getAdmins);
    this.server.get('/api/admin/:adminId', jwt_auth_1["default"].verifyToken, operator_1["default"].getAdminById);
    this.server.post('/api/admin', basic_auth_1["default"].isAuthenticated, operator_1["default"].createAdmin);
    this.server.post('/api/admin/login', basic_auth_1["default"].isAuthenticated, operator_1["default"].loginAdmin);
    this.server.put('/api/admin/:adminId', jwt_auth_1["default"].verifyToken, operator_1["default"].updateAdmin);
    this.server.del('/api/admin/:adminId', jwt_auth_1["default"].verifyToken, operator_1["default"].deleteAdmin);
}
exports.Application = Application;
