import mongodb from '../../../../../database/mongodb/commands';

const config = require('../../../../../config/config');
const db = new mongodb(config.get('/mongo'));

import Admin from './main';
const admin = new Admin(db);

const getAdmins = async () => {
  return admin.getAdmins();
};

const getAdminById = async (payload: any) => {
  return admin.getAdminById(payload);
};

export default {
  getAdmins,
  getAdminById
};
