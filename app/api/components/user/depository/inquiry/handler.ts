import mongodb from '../../../../../database/mongodb/commands';

const config = require('../../../../../config/config');
const db = new mongodb(config.get('/mongo'));

import User from './main';
const user = new User(db);

const getUsers = async () => {
  return user.getUsers();
};

const getUserById = async (payload: any) => {
  return user.getUserById(payload);
};

export default {
  getUsers,
  getUserById,
};
