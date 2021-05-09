import mongodb from '../../../../../database/mongodb/commands';

const config = require('../../../../../config/config');
const db = new mongodb(config.get('/mongo'));

import User from './main';
const user = new User(db);

const createUser = async (payload: any) => {
  return user.createUser(payload);
};

const loginUser = async (payload: any) => {
  return user.loginUser(payload);
};

const updateUser = async (payload: any) => {
  return user.updateUser(payload);
};

const deleteUser = async (payload: any) => {
  return user.deleteUser(payload);
};

export default {
  loginUser,
  createUser,
  updateUser,
  deleteUser,
};
