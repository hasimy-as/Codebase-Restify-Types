import mongodb from 'mongodb';
import validate from 'validate.js';

import logger from '../../helpers/logger';
import wrapper from '../../helpers/wrapper';

import { CODE } from '../../lib/http_code';

const config = require('../../config/config');

const ctx = 'Db-connection';
const connPool: any[] = [];
const conn = () => {
  const connState = { index: 0, config: '', db: null };
  return connState;
};

const createConnection = async (config: any) => {
  const options: Object = {
    poolSize: 50,
    keepAlive: 15000,
    socketTimeoutMS: 15000,
    connectTimeoutMS: 15000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    const mongoConnect = await mongodb.connect(config, options);
    logger.info(ctx, 'Established!', 'Database connection');
    return wrapper.data(mongoConnect);
  } catch (err) {
    logger.error(ctx, err, 'Error!');
    wrapper.error(err, err.message, CODE.SERVICE_UNAVAILABLE);
  }
};

const addConnectionPool = () => {
  const connection = conn();
  connection.config = config.get('/mongo');
  return connPool.push(connection);
};

const createConnectionPool = async () => {
  connPool.map(async (currentConnection, index) => {
    const result = await createConnection(currentConnection.config);
    if (result.err) {
      connPool[index].db = currentConnection;
    } else {
      connPool[index].db = result.data;
    }
  });
};

const isExistConnection = async (config: any) => {
  let state = {};
  connPool.map((currentConnection) => {
    if (currentConnection.config === config) {
      state = currentConnection;
    }
    return state;
  });
  if (validate.isEmpty(state))
    wrapper.error(
      'Error connection',
      'Connection must be created',
      CODE.NOT_FOUND,
    );

  return wrapper.data(state);
};

const isConnected = async (state: { db: any; }) => {
  const connection = state.db;
  if (!connection.isConnected()) {
    wrapper.error(
      'Error connection',
      'Connection must be created',
      CODE.NOT_FOUND,
      state,
    );
  }
  return wrapper.data(state);
};

// Exported functions

export const getConnection = async (config: any) => {
  let connectionIndex: any;
  const checkConnection = async () => {
    const result = await isExistConnection(config);
    if (result.err) {
      return result;
    }
    const connection = await isConnected(result.data);
    connectionIndex = result.data.index;
    return connection;
  };

  const result = await checkConnection();
  if (result.err) {
    const state = await createConnection(config);
    if (state.err) {
      wrapper.data(connPool[connectionIndex]);
    }
    connPool[connectionIndex].db = state.data;
    return wrapper.data(connPool[connectionIndex]);
  }
  return result;
};

export const init = () => {
  addConnectionPool();
  createConnectionPool();
};
