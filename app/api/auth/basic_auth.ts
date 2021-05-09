import passport from 'passport';
import { BasicStrategy } from 'passport-http';

import User from './authentication';

passport.use(
  new BasicStrategy((username: any, password: any, cb: any) => {
    User.findByUsername(username, (user: any) => {
      if (!user) {
        return cb(null, false);
      }
      if (!user.isValidPassword(password)) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  }),
);

const isAuthenticated = passport.authenticate('basic', { session: false });
const init = () => passport.initialize();

export default {
  isAuthenticated,
  init,
};
