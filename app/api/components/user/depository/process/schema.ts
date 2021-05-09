import joi from 'joi';
import { ROLES } from '../../../../../lib/fields';

const createUser = joi.object({
  roles: joi.string().default(ROLES.USER).optional(),
  name: joi.string().required(),
  address: joi.string().required(),
  email: joi.string().email().max(50).required(),
  password: joi.string().min(6).required(),
});

const loginUser = joi.object({
  email: joi.string().email().max(50).required(),
  password: joi.string().min(6).required(),
});

const updateUser = joi.object({
  userId: joi.string().guid().required(),
  name: joi.string().required(),
  address: joi.string().required(),
  email: joi.string().email().max(50).required(),
  password: joi.string().min(6).required(),
});

const deleteUser = joi.object({
  userId: joi.string().guid().required(),
});

export default {
  loginUser,
  createUser,
  updateUser,
  deleteUser
};
