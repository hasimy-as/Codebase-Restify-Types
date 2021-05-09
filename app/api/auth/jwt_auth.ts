import fs from 'fs';
import jwt from 'jsonwebtoken';
import validate from 'validate.js';
import { Request, Response, Next } from 'restify';

import wrapper from '../../helpers/wrapper';
import Redis from '../../database/redis/commands';

import { CODE } from '../../lib/http_code';

interface IAuthRequest extends Request {
  opts: any
};

const config = require('../../config/config');

const client = new Redis(config);

const getKey = (keyPath: any) => fs.readFileSync(keyPath, 'utf8');

const algorithm: Object = 'RS256';

const generateToken = async (payload: any) => {
  const privateKey = getKey(config.get('/privateKey'));
  const token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    issuer: 'hasimy-as',
    expiresIn: '24h',
  });
  return token;
};

const getToken = (headers: any) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return undefined;
};

const verifyToken = async (req: IAuthRequest, res: Response, next: Next) => {
  const result = {
    data: null,
  };
  const publicKey = fs.readFileSync(config.get('/publicKey'), 'utf8');

  const token = getToken(req.headers);
  if (!token) {
    return wrapper.response(res, 'fail', result, 'Invalid token!', CODE.FORBIDDEN);
  }
  let decodedToken: any;
  try {
    decodedToken = await jwt.verify(token, publicKey, algorithm);
    const { data: redis, err: redisErr }: any = await client.get(`${decodedToken.key}${decodedToken._id}`);
    if (redisErr || validate.isEmpty(redis)) {
      return wrapper.response(res, 'fail', result, 'Access token expired!', CODE.UNAUTHORIZED);
    }
    decodedToken = JSON.parse(redis);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return wrapper.response(res, 'fail', result, 'Access token expired!', CODE.UNAUTHORIZED);
    }
    return wrapper.response(res, 'fail', result, 'Token is not valid!', CODE.UNAUTHORIZED);
  }

  const opts = {
    ...decodedToken,
    authorization: req.headers.authorization
  };

  req.opts = opts;
  next();
};

export default {
  generateToken,
  verifyToken,
};
