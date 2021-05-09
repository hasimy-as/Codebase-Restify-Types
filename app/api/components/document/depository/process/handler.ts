import mongodb from '../../../../../database/mongodb/commands';

const config = require('../../../../../config/config');
const db = new mongodb(config.get('/mongo'));

const Document = require('./main');
const document = new Document(db);

const createDocument = async (payload: any) => {
  return document.createDocument(payload);
};

const updateDocument = async (payload: any) => {
  return document.updateDocument(payload);
};

const deleteDocument = async (payload: any) => {
  return document.deleteDocument(payload);
};

export default {
  createDocument,
  updateDocument,
  deleteDocument,
};
