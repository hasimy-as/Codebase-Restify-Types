import * as restify from 'restify';
import { Request, Response, Next } from 'restify';

import wrapper from '../helpers/wrapper';
import project from '../../package.json';
import basicAuth from './auth/basic_auth';
import jwtAuth from './auth/jwt_auth';

import admin from './components/admin/operator';

export function Application(this: any) {
  this.server = restify.createServer({
    name: project.name,
    version: project.version,
  });

  this.server.serverKey = '';
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser({
    multiples: true,
    mapParams: true
  }));

  this.server.use(restify.plugins.authorizationParser());

  this.server.opts('/\\.*/', (req: Request, res: Response, next: Next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      req.header('Access-Control-Request-Method')
    );
    res.header(
      'Access-Control-Allow-Headers',
      req.header('Access-Control-Request-Headers')
    );
    res.header('Access-Control-Expose-Headers', 'Authorization');
    res.header(
      'Access-Control-Allow-Headers',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type,**Authorization**'
    );
    res.send(200);
    return next();
  });

  this.server.use(basicAuth.init());
  this.server.get('/', (req: Request, res: Response) => {
    wrapper.response(
      res,
      'success',
      wrapper.data('Server'),
      'This server is running properly',
    );
  });

  // Admin
  this.server.get('/api/admin', jwtAuth.verifyToken, admin.getAdmins);
  this.server.get('/api/admin/:adminId', jwtAuth.verifyToken, admin.getAdminById);
  this.server.post('/api/admin', basicAuth.isAuthenticated, admin.createAdmin);
  this.server.post('/api/admin/login', basicAuth.isAuthenticated, admin.loginAdmin);
  this.server.put('/api/admin/:adminId', jwtAuth.verifyToken, admin.updateAdmin);
  this.server.del('/api/admin/:adminId', jwtAuth.verifyToken, admin.deleteAdmin);

}
