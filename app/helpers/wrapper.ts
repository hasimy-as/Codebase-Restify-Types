import { CODE } from '../lib/http_code';

const data: Function = (data: any, description = '', code = CODE.SUCCESS) => ({
  err: null,
  message: description,
  data,
  code,
});

const error: Function = (err: any, description: any, code = CODE.INTERNAL_ERROR) => ({
  err,
  code,
  data: '',
  message: description,
});

const response: Function = (res: { send: (arg0: any, arg1: { success: boolean; data: any; message: any; code: any; }) => void; }, type: any, result: { message: any; code: any; data: any; }, message: any, code: any) => {
  if (message) {
    result.message = message;
  }
  if (code) {
    result.code = code;
  }
  let status;
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
    code: result.code,
  });
};

export default {
  data,
  error,
  response,
};