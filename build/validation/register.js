'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('./isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateRegisterForm(data) {
  var errors = {};

  data.firstname = !(0, _isEmpty2.default)(data.firstname) ? data.firstname : '';
  data.lastname = !(0, _isEmpty2.default)(data.lastname) ? data.lastname : '';
  data.role = !(0, _isEmpty2.default)(data.role) ? data.role : '';
  data.username = !(0, _isEmpty2.default)(data.username) ? data.username : '';
  data.email = !(0, _isEmpty2.default)(data.email) ? data.email : '';
  data.password = !(0, _isEmpty2.default)(data.password) ? data.password : '';

  if (!_validator2.default.isLength(data.firstname, { min: 2, max: 30 })) {
    errors.firstname = 'First Name must be between 2 and 30 character long';
  }

  if (!_validator2.default.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = 'Last Name must be between 2 and 30 character long';
  }

  if (_validator2.default.isEmpty(data.firstname)) {
    errors.firstname = 'First Name field is required';
  }

  if (_validator2.default.isEmpty(data.lastname)) {
    errors.lastname = 'Last Name field is required';
  }

  if (_validator2.default.isEmpty(data.role)) {
    errors.role = 'Role field is required';
  }

  if (_validator2.default.isEmpty(data.username)) {
    errors.username = 'username field is required';
  }

  if (_validator2.default.isEmpty(data.email)) {
    errors.email = 'email field is required';
  }

  if (!_validator2.default.isEmail(data.email)) {
    errors.email = 'email is invalid';
  }

  if (_validator2.default.isEmpty(data.password)) {
    errors.password = 'password field is required';
  }

  if (!_validator2.default.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'password must be at least 6 characters long';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
};

exports.default = validateRegisterForm;
//# sourceMappingURL=register.js.map