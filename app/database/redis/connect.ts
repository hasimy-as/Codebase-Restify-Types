import redis from 'redis';

const genericPool = require('generic-pool');
const config = require('../../config/config');

export const myPool = () =>
  genericPool.createPool({
    create: function () {
      return redis.createClient(config.get('/redis'));
    },
    destroy: function (client: any) {
      client.quit();
    }
  }, {
    max: 10,
    min: 2,
    idleTimeoutMillis: 1000
  });
