const config = require('../../config/config');

export default class User {
  username: any;
  password: any;

  constructor(username: any, password: any) {
    this.username = username;
    this.password = password;
  }

  isValidPassword(password: any) {
    return this.password === password;
  }

  static findByUsername(username: any, cb: any) {
    const userDatas = config.get('/basicAuth');
    let userData;
  
    userData = userDatas.map((val: any) => {
      if (val.username === username) {
        return val;
      }
      return '';
    });
    const user = new User(userData[0].username, userData[0].password);
    cb(user);
  }
}
