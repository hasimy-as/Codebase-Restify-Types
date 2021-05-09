import mongodb from '../../../../../database/mongodb/commands';

const config = require('../../../../../config/config');
const db = new mongodb(config.get('/mongo'));

import Document from './main';
const document = new Document(db);

const getDocument = async () => {
  return document.getDocument();
};

const getDocumentById = async (payload: any) => {
  return document.getDocumentById(payload);
};

export default {
  getDocument,
  getDocumentById,
};
