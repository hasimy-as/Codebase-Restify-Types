import { CODE } from '../../../../../lib/http_code';

import logger from '../../../../../helpers/logger';
import wrapper from '../../../../../helpers/wrapper';

import Query from './query';

export default class Document {
  qProcess: any;

  constructor(db: any) {
    this.qProcess = new Query(db);
  }

  async getDocument() {
    const ctx = 'Document-getDocument';
    const document = await this.qProcess.findMany();
    if (document.err) {
      logger.error(ctx, 'Cannot get all documents.', document.err);
      return wrapper.error('error', 'Cannot get all documents!', CODE.INTERNAL_ERROR);
    }
    const { data } = document;
    return wrapper.data(data, '', CODE.SUCCESS);
  }

  async getDocumentById(payload: any) {
    const ctx = 'Document-getDocumentById';
    const document = await this.qProcess.findOne({ documentId: payload.documentId });
    if (document.err) {
      logger.error(ctx, 'Document not found.', document.err);
      return wrapper.error('error', 'Document not found!', CODE.NOT_FOUND);
    }
    const { data } = document;
    return wrapper.data(data, '', CODE.SUCCESS);
  }
}
