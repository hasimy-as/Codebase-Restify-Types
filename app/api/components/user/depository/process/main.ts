import { v4 as uuid } from 'uuid';

import { ROLES, REDIS_KEY } from '../../../../../lib/fields';
import { CODE } from '../../../../../lib/http_code';

import jwtAuth from '../../../../auth/jwt_auth';
import crypt from '../../../../../helpers/crypt';
import logger from '../../../../../helpers/logger';
import wrapper from '../../../../../helpers/wrapper';

import Command from './command';
import Query from '../inquiry/query';
import Redis from '../../../../../database/redis/commands';

export default class User {
  client: any;
  process: any;
  qProcess: any;

  constructor(db: any) {
    this.client = new Redis(db);
    this.process = new Command(db);
    this.qProcess = new Query(db);
  }

  async createUser(payload: any) {
    const ctx = 'User-createUser';
    const { opts, ...payloadVal } = payload;
    if (opts.roles !== ROLES.SUPER_ADMIN) {
      logger.error(ctx, 'This account is not an admin.', 'Error');
      return wrapper.error('fail', 'This account is not an admin!', CODE.UNAUTHORIZED);
    }

    const findEmail = await this.qProcess.findOne({ email: payload.email });
    if (findEmail.code === CODE.SUCCESS) {
      logger.error(ctx, 'Email has been used.', 'Error');
      return wrapper.error('error', 'Email has been used!', CODE.BAD_REQUEST);
    }

    const password = await crypt.encrypt(payload.password);
    const { data: user, err: userErr } = await this.process.insertOne({
      userId: uuid(),
      ...payloadVal,
      password: password,
      createdAt: new Date().toISOString()
    });

    if (userErr) {
      logger.error(ctx, 'Failed to create user.', userErr);
      return wrapper.error('fail', 'Failed to create user!', CODE.INTERNAL_ERROR);
    }

    return wrapper.data(user, '', CODE.SUCCESS);
  }

  async loginUser(payload: any) {
    const ctx = 'User-loginUser';
    const { data: user, err: userErr } = await this.qProcess.findOne({ email: payload.email });
    if (userErr) {
      logger.error(ctx, 'User not found.', userErr);
      return wrapper.error('error', 'User not found!', CODE.NOT_FOUND);
    }

    if (user.roles === ROLES.USER) {
      let userData: any = {};
      const { password, ...payloadVal } = user;
      const userPassword = await crypt.decrypt(password);

      if (payload.password === userPassword) {
        userData = {
          userId: payloadVal.userId,
          name: payloadVal.name,
          email: payloadVal.email,
          address: payloadVal.address,
          roles: payloadVal.roles,
          expiresIn: 864000,
          key: REDIS_KEY.USER
        };
      } else {
        logger.error(ctx, 'Password incorrect.', 'Error');
        return wrapper.error('error', 'Password incorrect!', CODE.BAD_REQUEST);
      }

      const token: any = await jwtAuth.generateToken(userData);
      const redis = await this.client.setExpire(`${userData.key}${userData._id}`, userData, 'EX', userData.expiresIn);
      if (token.err || redis.err) {
        return wrapper.error('fail', 'Login failed!', CODE.INTERNAL_ERROR);
      }

      const result = {
        ...userData,
        accessToken: token
      };

      return wrapper.data(result, 'Logged in', CODE.SUCCESS);
    }
    return wrapper.error('fail', 'Account is not a user!', CODE.UNAUTHORIZED);
  }

  async updateUser(payload: any) {
    const ctx = 'User-updateUser';
    const { opts, ...payloadVal } = payload;
    if (opts.roles !== ROLES.USER) {
      logger.error(ctx, 'This account is not a user.', 'Error');
      return wrapper.error('fail', 'This account is not a user!', CODE.UNAUTHORIZED);
    }

    const findUser = await this.qProcess.findOne({ userId: payload.userId });
    if (findUser.err) {
      logger.error(ctx, 'User not found.', findUser.err);
      return wrapper.error('error', 'User not found!', CODE.NOT_FOUND);
    }

    const password = await crypt.encrypt(payloadVal.password);
    const { data: user, err: userErr } = await this.process.updateOne(
      { userId: payload.userId },
      {
        $set: {
          ...payloadVal,
          password: password,
          updatedAt: new Date().toISOString()
        }
      },
    );
    if (userErr) {
      logger.error(ctx, 'Failed to update user.', userErr);
      return wrapper.error('fail', 'Failed to update user!', CODE.INTERNAL_ERROR);
    }

    return wrapper.data(user, '', CODE.SUCCESS);
  }

  async deleteUser(payload: any) {
    const ctx = 'User-deleteUser';
    const { opts } = payload;
    if (opts.roles !== ROLES.SUPER_ADMIN) {
      logger.error(ctx, 'This account is not an admin.', 'Error');
      return wrapper.error('fail', 'This account is not an admin!', CODE.UNAUTHORIZED);
    }

    const findUser = await this.qProcess.findOne({ userId: payload.userId });
    if (findUser.err) {
      logger.error(ctx, 'User not found', findUser.err);
      return wrapper.error('error', 'User not found!', CODE.NOT_FOUND);
    }

    const { data: user, err: userErr} = await this.process.deleteOne({ userId: payload.userId });
    if (userErr) {
      logger.error(ctx, 'Failed to delete user.', userErr);
      return wrapper.error('fail', 'Failed to delete user!', CODE.INTERNAL_ERROR);
    }

    return wrapper.data(user, '', CODE.SUCCESS);
  }
}
