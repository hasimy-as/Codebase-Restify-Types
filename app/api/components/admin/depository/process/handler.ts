import mongodb from '../../../../../database/mongodb/commands';

const config = require('../../../../../config/config');
const db = new mongodb(config.get('/mongo'));

import Admin from './main';
const admin = new Admin(db);

const createAdmin = async (payload: any) => {
  return admin.createAdmin(payload);
};

const loginAdmin = async (payload: any) => {
  return admin.loginAdmin(payload);
};

const updateAdmin = async (payload: any) => {
  return admin.updateAdmin(payload);
};

const deleteAdmin = async (payload: any) => {
  return admin.deleteAdmin(payload);
};

export default {
  loginAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin
}
