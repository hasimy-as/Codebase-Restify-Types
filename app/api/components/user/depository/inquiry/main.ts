import { CODE } from '../../../../../lib/http_code';

import logger from '../../../../../helpers/logger';
import wrapper from '../../../../../helpers/wrapper';

import Query from './query';

export default class User {
  qProcess: any;

  constructor(db: any) {
    this.qProcess = new Query(db);
  }

  async getUsers() {
    const ctx = 'User-getUsers';
    const user = await this.qProcess.findMany();
    if (user.err) {
      logger.error(ctx, 'Cannot get all users.', user.err);
      return wrapper.error('error', 'Cannot get all users!', CODE.INTERNAL_ERROR);
    }
    const { data } = user;
    return wrapper.data(data, '', CODE.SUCCESS);
  }

  async getUserById(payload: any) {
    const ctx = 'User-getUserById';
    const user = await this.qProcess.findOne({ userId: payload.userId });
    if (user.err) {
      logger.error(ctx, 'User not found', user.err);
      return wrapper.error('error', 'User not found!', CODE.NOT_FOUND);
    }
    const { data } = user;
    return wrapper.data(data, '', CODE.SUCCESS);
  }
}
