import joi from 'joi';

const getDocumentById = joi.object({
  documentId: joi.string().guid().required(),
});

export default {
  getDocumentById,
};
