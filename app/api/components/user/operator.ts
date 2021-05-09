import 'joi';

import { sendResponse } from '../../../helpers/response';
import processHandler from './depository/process/handler';
import processSchema from './depository/process/schema';

import inquiryHandler from './depository/inquiry/handler';
import inquirySchema from './depository/inquiry/schema';

const getUsers = async (req: Request, res: Response) => {
  const result = await inquiryHandler.getUsers();
  return sendResponse(result, res);
};

const getUserById = async (req: Request, res: Response) => {
  const { params }: any = req;
  const parameter = await inquirySchema.getUserByIdSchema.validateAsync(params);
  if (parameter.err) {
    return sendResponse(parameter, res);
  }
  const result = await inquiryHandler.getUserById(parameter);
  return sendResponse(result, res);
};

const createUser = async (req: Request, res: Response) => {
  let { body, opts }: any = req;
  const data = await processSchema.createUser.validateAsync(body);
  if (data.err) {
    return sendResponse(data, res);
  }
  const result = await processHandler.createUser({ ...data, opts });
  return sendResponse(result, res);
};

const loginUser = async (req: Request, res: Response) => {
  let { body } = req;
  const data = await processSchema.loginUser.validateAsync(body);
  if (data.err) {
    return sendResponse(data, res);
  }
  const result = await processHandler.loginUser(data);
  return sendResponse(result, res);
};

const updateUser = async (req: Request, res: Response) => {
  let { body, params, opts }: any = req;
  body = Object.assign(body, params);
  const data = await processSchema.updateUser.validateAsync(body);
  if (data.err) {
    return sendResponse(data, res);
  }
  const result = await processHandler.updateUser({ ...data, opts });
  return sendResponse(result, res);
};

const deleteUser = async (req: Request, res: Response) => {
  const { params, opts }: any = req;
  const parameter = await processSchema.deleteUser.validateAsync(params);
  if (parameter.err) {
    return sendResponse(parameter, res);
  }
  const result = await processHandler.deleteUser({ ...parameter, opts });
  return sendResponse(result, res);
};

export default {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
