const auth = require('basic-auth');
const bcrypt = require('bcrypt');

// bcryptライブラリを用いてパスワードをハッシュ化
const admins = {
  'lexsol': { password: 'L123' },
  'lexsol2': { password: 'L987' },
  'admin': {password: 'lexadmin'}
};

module.exports = function (request, response, next) {
  const user = auth(request);

  if (!user || !admins[user.name] || admins[user.name].password !== user.pass) {
    response.set('WWW-Authenticate', 'Basic realm="example"');
    return response.status(401).send();
  }
  return next();
};
