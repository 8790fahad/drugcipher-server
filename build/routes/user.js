'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _routesHelper = require('../services/routesHelper');

var _user = require('../controllers/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  // create a new user
  app.post('/api/users/create', _passport2.default.authenticate('jwt', { session: false }), (0, _routesHelper.allowOnly)(_config2.default.accessLevels.admin, _user.create));

  // user login
  app.post('/api/users/login', _user.login);

  //retrieve all users
  app.get('/api/users', _passport2.default.authenticate('jwt', {
    session: false
  }), (0, _routesHelper.allowOnly)(_config2.default.accessLevels.admin, _user.findAllUsers));

  // retrieve user by id
  app.get('/api/users/:userId', _passport2.default.authenticate('jwt', {
    session: false
  }), (0, _routesHelper.allowOnly)(_config2.default.accessLevels.admin, _user.findById));

  // update a user with id
  app.put('/api/users/:userId', _passport2.default.authenticate('jwt', {
    session: false
  }), (0, _routesHelper.allowOnly)(_config2.default.accessLevels.user, _user.update));

  // delete a user
  app.delete('/api/users/:userId', _passport2.default.authenticate('jwt', {
    session: false
  }), (0, _routesHelper.allowOnly)(_config2.default.accessLevels.admin, _user.deleteUser));
};
//# sourceMappingURL=user.js.map