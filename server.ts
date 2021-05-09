import { Application } from './app/api/index';
import logger from './app/helpers/logger';
const mongoConnect = require('./app/database/mongodb/connect');

const app = new (Application as any);

app.server.listen(process.env.PORT || 5000, (err: Error) => {
  let ctx = 'App-listen';
  if (err) throw logger.error(ctx, err, 'Server');
  mongoConnect.init();
  logger.info(ctx, 'Connected!', 'Server');
});
