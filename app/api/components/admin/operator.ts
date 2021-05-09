import 'joi';

import { sendResponse } from '../../../helpers/response';
import processHandler from './depository/process/handler';
import processSchema from './depository/process/schema';

import inquiryHandler from './depository/inquiry/handler';
import inquirySchema from './depository/inquiry/schema';

const getAdmins = async (req: Request, res: Response) => {
  const result = await inquiryHandler.getAdmins();
  return sendResponse(result, res);
};

const getAdminById = async (req: Request, res: Response) => {
  const { params }: any = req;
  const parameter = await inquirySchema.getAdminById.validateAsync(params);
  if (parameter.err) {
    return sendResponse(parameter, res);
  }
  const result = await inquiryHandler.getAdminById(parameter);
  return sendResponse(result, res);
};

const createAdmin = async (req: Request, res: Response) => {
  let { body } = req;
  const data = await processSchema.createAdmin.validateAsync(body);
  if (data.err) {
    return sendResponse(data, res);
  }
  const result = await processHandler.createAdmin(data);
  return sendResponse(result, res);
};

const loginAdmin = async (req: Request, res: Response) => {
  let { body } = req;
  const data = await processSchema.loginAdmin.validateAsync(body);
  if (data.err) {
    return sendResponse(data, res);
  }
  const result = await processHandler.loginAdmin(data);
  return sendResponse(result, res);
};

const updateAdmin = async (req: Request, res: Response) => {
  let { body, params, opts }: any = req;
  body = Object.assign(body, params);
  const data = await processSchema.updateAdmin.validateAsync(body);
  if (data.err) {
    return sendResponse(data, res);
  }
  const result = await processHandler.updateAdmin({ ...data, opts });
  return sendResponse(result, res);
};

const deleteAdmin = async (req: Request, res: Response) => {
  const { params, opts }: any = req;
  const parameter = await processSchema.deleteAdmin.validateAsync(params);
  if (parameter.err) {
    return sendResponse(parameter, res);
  }
  const result = await processHandler.deleteAdmin({ ...parameter, opts });
  return sendResponse(result, res);
};

export default {
  getAdmins,
  getAdminById,
  createAdmin,
  loginAdmin,
  updateAdmin,
  deleteAdmin
};
