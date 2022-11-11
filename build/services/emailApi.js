'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMail = sendMail;
exports.sendMail2 = sendMail2;

var _nodemailer = require('../config/nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _misc = require('../queries/misc');

var _users = require('../queries/users');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sendMail(_ref) {
  var email = _ref.email,
      subject = _ref.subject,
      html = _ref.html;

  _nodemailer2.default.sendMail({
    from: 'BitCoops',
    to: email,
    subject: subject,
    html: html
  }).then(function (info) {
    console.log('Message sent: %s', info.messageId);
  }).catch(function (err) {
    return console.log('Error', err);
  });
}

function sendMail2(_ref2) {
  var userId = _ref2.userId,
      subject = _ref2.subject,
      html = _ref2.html;

  (0, _users.usersApi)({
    id: userId,
    query_type: 'info'
  }, function (data) {
    var userInfo = data[0];
    (0, _misc.appConfigApi)({ query_type: 'email' }).then(function (configObj) {
      console.log('Email config: ', configObj);

      var transporter = nodemailer.createTransport(smtpTransport({
        host: configObj.email_host,
        port: configObj.email_port,
        secure: configObj.email_secure, // secure:true for port 465, secure:false for port 587
        auth: {
          user: configObj.email_auth_username,
          pass: configObj.email_auth_password
        }
      }));

      transporter.sendMail({
        from: 'BitCoops',
        to: userInfo.email,
        subject: subject,
        html: html
      }).then(function (info) {
        console.log('Message sent: %s', info.messageId);
      }).catch(function (err) {
        return console.log('Error', err);
      });
    });
  }, function (e) {
    console.log(e);
  });
}
//# sourceMappingURL=emailApi.js.map