import { CODE } from '../../../../../lib/http_code';

import logger from '../../../../../helpers/logger';
import wrapper from '../../../../../helpers/wrapper';

import Query from './query';

export default class Admin {
  qProcess: any;

  constructor(db: any) {
    this.qProcess = new Query(db);
  };

  async getAdmins() {
    const ctx = 'Admin-getAdmins';
    const { data: admin, err: adminErr } = await this.qProcess.findMany();
    if (adminErr) {
      logger.error(ctx, 'Cannot get all admins.', adminErr);
      return wrapper.error('error', 'Cannot get all admins!', CODE.INTERNAL_ERROR);
    }
    return wrapper.data(admin, '', CODE.SUCCESS);
  };

  async getAdminById(payload: any) {
    const ctx = 'Admin-getAdminById';
    const { data: admin, err: adminErr } = await this.qProcess.findOne({ adminId: payload.adminId });
    if (adminErr) {
      logger.error(ctx, 'Admin not found', adminErr);
      return wrapper.error('error', 'Admin not found!', CODE.NOT_FOUND);
    }
    return wrapper.data(admin, '', CODE.SUCCESS);
  }
};
