import 'joi';

import { sendResponse } from '../../../helpers/response';
import processHandler from './depository/process/handler';
import processSchema from './depository/process/schema';

import inquiryHandler from './depository/inquiry/handler';
import inquirySchema from './depository/inquiry/schema';

const getDocument = async (req: Request, res: Response) => {
  const result = await inquiryHandler.getDocument();
  return sendResponse(result, res);
};

const getDocumentById = async (req: Request, res: Response) => {
  const { params }: any = req;
  const parameter = await inquirySchema.getDocumentById.validateAsync(params);
  if (parameter.err) {
    return sendResponse(parameter, res);
  }
  const result = await inquiryHandler.getDocumentById(parameter);
  return sendResponse(result, res);
};

const createDocument = async (req: Request, res: Response) => {
  let { body, opts }: any = req;
  const data = await processSchema.createDocument.validateAsync(body);
  if (data.err) {
    return sendResponse(data, res);
  }
  const result = await processHandler.createDocument({ ...data, opts });
  return sendResponse(result, res);
};

const updateDocument = async (req: Request, res: Response) => {
  let { body, params, opts }: any = req;
  body = Object.assign(body, params);
  const data = await processSchema.updateDocument.validateAsync(body);
  if (data.err) {
    return sendResponse(data, res);
  }
  const result = await processHandler.updateDocument({ ...data, opts });
  return sendResponse(result, res);
};

const deleteDocument = async (req: Request, res: Response) => {
  const { params, opts }: any = req;
  const parameter = await processSchema.deleteDocument.validateAsync(params);
  if (parameter.err) {
    return sendResponse(parameter, res);
  }
  const result = await processHandler.deleteDocument({ ...parameter, opts });
  return sendResponse(result, res);
};

export default {
  getDocument,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
};
