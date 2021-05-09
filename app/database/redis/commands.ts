import * as getConnection from './connect';
import wrapper from '../../helpers/wrapper';

import { CODE } from '../../lib/http_code';

export default class Redis {
  config: any;

  constructor(config: any) {
    this.config = config;
  }

  async setExpire(key: any, value: any, expireType: any, expire: any) {
    let client = await getConnection.myPool().acquire();
    client.on('error', (err: any) => {
      return wrapper.error(err, 'Failed to set data on Redis');
    });

    client.set(key, JSON.stringify(value), expireType, expire);
    return wrapper.data('', 'Successfully set data on Redis', 200);
  }

  async get(key: any) {
    let client = await getConnection.myPool().acquire();
    client.on('error', (err: any) => {
      if (err === 'ECONNREFUSED') {
        return wrapper.error(err, 'Failed to get data from Redis');
      }
      return wrapper.error(err, 'Failed to get data from Redis');
    });
    return new Promise(((resolve, reject) => {
      client.get(key, (err: any, replies: any) => {
        if (err !== null) {
          reject(wrapper.error(err, 'Data not found', CODE.NOT_FOUND));
        }
        resolve(wrapper.data(replies));
      });
    }));
  }

  async del(key: any) {
    let client = await getConnection.myPool().acquire();
    client.on('error', (err: any) => {
      return wrapper.error(err, 'Failed to set data on Redis');
    });
    client.del(key);
    return wrapper.data('', 'Success deleting data on Redis', CODE.SUCCESS);
  }

  async incr(key: any) {
    let client = await getConnection.myPool().acquire();
    client.on('error', (err: any) => {
      if (err === 'ECONNREFUSED') {
        return wrapper.error(err, 'Failed to increment data from Redis');
      }
      return wrapper.error(err, 'Failed to increment data from Redis');
    });
    return new Promise(((resolve, reject) => {
      client.incr(key, (err: any, replies: any) => {
        if (err !== null) {
          reject(wrapper.error(err, 'Failed to increment data from Redis', CODE.INTERNAL_ERROR));
        }
        resolve(wrapper.data(replies));
      });
    }));
  }
}
