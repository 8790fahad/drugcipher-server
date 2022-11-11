'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.update = exports.findById = exports.findAllUsers = exports.login = exports.create = undefined;

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _register = require('../validation/register');

var _register2 = _interopRequireDefault(_register);

var _login = require('../validation/login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User;

// load input validation


// create user
var create = function create(req, res) {
  var _validateRegisterForm = (0, _register2.default)(req.body),
      errors = _validateRegisterForm.errors,
      isValid = _validateRegisterForm.isValid;

  var _req$body = req.body,
      firstname = _req$body.firstname,
      lastname = _req$body.lastname,
      username = _req$body.username,
      role = _req$body.role,
      email = _req$body.email,
      password = _req$body.password;

  // check validation

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findAll({ where: { email: email } }).then(function (user) {
    if (user.length) {
      return res.status(400).json({ email: 'Email already exists!' });
    } else {
      var newUser = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        role: role,
        email: email,
        password: password
      };
      _bcryptjs2.default.genSalt(10, function (err, salt) {
        _bcryptjs2.default.hash(newUser.password, salt, function (err, hash) {
          if (err) throw err;
          newUser.password = hash;
          User.create(newUser).then(function (user) {
            res.json({ user: user });
          }).catch(function (err) {
            res.status(500).json({ err: err });
          });
        });
      });
    }
  });
};

var login = function login(req, res) {
  var _validateLoginForm = (0, _login2.default)(req.body),
      errors = _validateLoginForm.errors,
      isValid = _validateLoginForm.isValid;

  // check validation


  if (!isValid) {
    return res.status(400).json(errors);
  }

  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;


  User.findAll({
    where: {
      email: email
    }
  }).then(function (user) {
    //check for user
    if (!user.length) {
      errors.email = 'User not found!';
      return res.status(404).json(errors);
    }

    var originalPassword = user[0].dataValues.password;

    //check for password
    _bcryptjs2.default.compare(password, originalPassword).then(function (isMatch) {
      if (isMatch) {
        // user matched
        console.log('matched!');
        var _user$0$dataValues = user[0].dataValues,
            id = _user$0$dataValues.id,
            username = _user$0$dataValues.username;

        var payload = { id: id, username: username }; //jwt payload
        // console.log(payload)

        _jsonwebtoken2.default.sign(payload, 'secret', {
          expiresIn: 3600
        }, function (err, token) {
          res.json({
            success: true,
            token: 'Bearer ' + token,
            role: user[0].dataValues.role
          });
        });
      } else {
        errors.password = 'Password not correct';
        return res.status(400).json(errors);
      }
    }).catch(function (err) {
      return console.log(err);
    });
  }).catch(function (err) {
    return res.status(500).json({ err: err });
  });
};

// fetch all users
var findAllUsers = function findAllUsers(req, res) {
  User.findAll().then(function (user) {
    res.json({ user: user });
  }).catch(function (err) {
    return res.status(500).json({ err: err });
  });
};

// fetch user by userId
var findById = function findById(req, res) {
  var id = req.params.userId;

  User.findAll({ where: { id: id } }).then(function (user) {
    if (!user.length) {
      return res.json({ msg: 'user not found' });
    }
    res.json({ user: user });
  }).catch(function (err) {
    return res.status(500).json({ err: err });
  });
};

// update a user's info
var update = function update(req, res) {
  var _req$body3 = req.body,
      firstname = _req$body3.firstname,
      lastname = _req$body3.lastname,
      HospitalId = _req$body3.HospitalId,
      role = _req$body3.role,
      image = _req$body3.image;

  var id = req.params.userId;

  User.update({
    firstname: firstname,
    lastname: lastname,
    role: role
  }, { where: { id: id } }).then(function (user) {
    return res.status(200).json({ user: user });
  }).catch(function (err) {
    return res.status(500).json({ err: err });
  });
};

// delete a user
var deleteUser = function deleteUser(req, res) {
  var id = req.params.userId;

  User.destroy({ where: { id: id } }).then(function () {
    return res.status.json({ msg: 'User has been deleted successfully!' });
  }).catch(function (err) {
    return res.status(500).json({ msg: 'Failed to delete!' });
  });
};

exports.create = create;
exports.login = login;
exports.findAllUsers = findAllUsers;
exports.findById = findById;
exports.update = update;
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map