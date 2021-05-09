import joi from 'joi';

const getAdminById = joi.object({
  adminId: joi.string().guid().required(),
});

export default {
  getAdminById
};
