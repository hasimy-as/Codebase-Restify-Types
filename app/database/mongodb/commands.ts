import validate from 'validate.js';
import logger from '../../helpers/logger';
import wrapper from '../../helpers/wrapper';

import { CODE } from '../../lib/http_code';

import * as mongoConnect from './connect';

export default class Commands {
  config: any;
  collectionName: any;
  dbName: any;

  constructor(config: any) {
    this.config = config;
  }

  setCollection(collectionName: any) {
    this.collectionName = collectionName;
  }

  async getDatabase() {
    const config = this.config.split('/').pop();
    const dbName = validate.isEmpty(this.dbName) ? config : this.dbName;
    return dbName;
  }

  async insertOne(document: any) {
    const ctx = 'Mongodb-insertOne';
    const dbName = await this.getDatabase();
    const result = await mongoConnect.getConnection(this.config);
    if (result.err) {
      logger.error(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const record = await db.insertOne(document);
      if (record.result.n !== 1) {
        logger.error(ctx, CODE.BAD_REQUEST, 'Database error');
        return wrapper.error('Failed to insert data');
      }
      return wrapper.data(document);
    } catch (err) {
      logger.error(ctx, err.message, 'Error insert data in mongodb');
      return wrapper.error(`Insert One => ${err.message}`);
    }
  }

  async findMany(params: any) {
    const ctx = 'Mongodb-findMany';
    const dbName = await this.getDatabase();
    const result = await mongoConnect.getConnection(this.config);
    if (result.err) {
      logger.error(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const record = await db.find(params).toArray();
      if (validate.isEmpty(record)) {
        return wrapper.error('Data not found', CODE.NOT_FOUND);
      }
      return wrapper.data(record);
    } catch (err) {
      logger.error(ctx, err.message, 'Error find data in mongodb');
      return wrapper.error(`Find Many => ${err.message}`);
    }
  }

  async findOne(params: any) {
    const ctx = 'Mongodb-findOne';
    const dbName = await this.getDatabase();
    const result = await mongoConnect.getConnection(this.config);
    if (result.err) {
      logger.error(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const record = await db.findOne(params);
      if (validate.isEmpty(record)) {
        return wrapper.error('Data not found', CODE.NOT_FOUND);
      }
      return wrapper.data(record);
    } catch (err) {
      logger.error(ctx, err.message, 'Error find data in mongodb');
      return wrapper.error(`Find One => ${err.message}`);
    }
  }

  async updateOne(params: any, query: any) {
    const ctx = 'Mongodb-updateOne';
    const dbName = await this.getDatabase();
    const result = await mongoConnect.getConnection(this.config);
    if (result.err) {
      logger.error(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const data = await db.updateOne(params, query, {
        upsert: true,
      });
      if (data.result.nModified >= 0) {
        const {
          result: { nModified },
        } = data;
        const record = await this.findOne(params);
        if (nModified === 0) {
          return wrapper.data(record.data);
        }
        return wrapper.data(record.data);
      }
      return wrapper.error('Failed update data');
    } catch (err) {
      logger.error(ctx, err.message, 'Error update data in mongodb');
      return wrapper.error(`Update One => ${err.message}`);
    }
  }

  async deleteOne(params: any) {
    const ctx = 'Mongodb-deleteOne';
    const dbName = await this.getDatabase();
    const result = await mongoConnect.getConnection(this.config);
    if (result.err) {
      logger.error(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const record = await db.deleteOne(params);
      if (validate.isEmpty(record)) {
        return wrapper.error('Data not found', CODE.NOT_FOUND);
      }
      return wrapper.data(record);
    } catch (err) {
      logger.error(ctx, err.message, 'Error delete data in mongodb');
      return wrapper.error(`Delete One => ${err.message}`);
    }
  }

  async aggregate(parameter: any) {
    const ctx = 'Mongodb-aggregate';
    const dbName = await this.getDatabase();
    const result = await mongoConnect.getConnection(this.config);
    if (result.err) {
      logger.error(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const record = await db.aggregate(parameter, { collation: { locale: 'en' } }).toArray();
      if (validate.isEmpty(record)) {
        return wrapper.error('Data not found', CODE.NOT_FOUND);
      }
      return wrapper.data(record);

    } catch (err) {
      logger.error(ctx, err.message, 'Error find and aggregate data in mongodb');
      return wrapper.error(`Aggregate => ${err.message}`);
    }
  }
}
