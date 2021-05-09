"use strict";
exports.__esModule = true;
var http_code_1 = require("../lib/http_code");
var data = function (data, description, code) {
    if (description === void 0) { description = ''; }
    if (code === void 0) { code = http_code_1.CODE.SUCCESS; }
    return ({
        err: null,
        message: description,
        data: data,
        code: code
    });
};
var error = function (err, description, code) {
    if (code === void 0) { code = http_code_1.CODE.INTERNAL_ERROR; }
    return ({
        err: err,
        code: code,
        data: '',
        message: description
    });
};
var response = function (res, type, result, message, code) {
    if (message) {
        result.message = message;
    }
    if (code) {
        result.code = code;
    }
    var status;
    switch (type) {
        case 'fail':
            status = false;
            break;
        case 'success':
            status = true;
            break;
        default:
            status = true;
            break;
    }
    res.send(result.code, {
        success: status,
        data: result.data,
        message: result.message,
        code: result.code
    });
};
exports["default"] = {
    data: data,
    error: error,
    response: response
};
