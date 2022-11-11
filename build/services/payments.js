'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FW_SECRET_KEY = exports.PAYSTACK_BASE_URL = exports.RAVE_BASE_URL = exports.FLUTTERWAVE_BASE_URL = undefined;
exports.getBankList = getBankList;
exports.createSubAccount = createSubAccount;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FLUTTERWAVE_BASE_URL = exports.FLUTTERWAVE_BASE_URL = 'https://api.flutterwave.com/v3';
var RAVE_BASE_URL = exports.RAVE_BASE_URL = 'https://api.ravepay.co/v2';
var PAYSTACK_BASE_URL = exports.PAYSTACK_BASE_URL = 'https://api.paystack.co';
var FW_SECRET_KEY = exports.FW_SECRET_KEY = 'FLWSECK-278f7fde7290a11a144751d3410fb7d8-X';

function getBankList() {
  var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (f) {
    return f;
  };
  var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (f) {
    return f;
  };

  var options = {
    method: 'GET',
    url: FLUTTERWAVE_BASE_URL + '/banks/NG',
    headers: {
      Authorization: 'Bearer ' + FW_SECRET_KEY
    }
  };

  (0, _request2.default)(options, function (err, response, body) {
    //   console.log(body)
    var info = JSON.parse(body);
    // console.log(info)
    if (!err) {
      console.log('callback called');
      callback(info);
    } else {
      console.log('error cb called');
      console.log(err);
      error({ err: err, success: false });
      // error.success = false
      //   res.status(500).json(error)
    }
  });
}

function createSubAccount() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (f) {
    return f;
  };
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (f) {
    return f;
  };
  var user = arguments[3];

  var obj = {
    account_bank: data.bank_code,
    account_number: data.account_no.toString().padStart(10, '0'),
    business_name: data.description,
    business_email: 'pharmpayng@gmail.com',
    business_contact: data.description,
    business_contact_mobile: data.user_phone,
    business_mobile: data.user_phone,
    country: 'NG',
    split_type: 'flat',
    split_value: data.amount

    // console.log(obj)

  };var options = {
    method: 'POST',
    url: FLUTTERWAVE_BASE_URL + '/subaccounts',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + FW_SECRET_KEY
    },
    body: JSON.stringify(obj)
  };

  (0, _request2.default)(options, function (err, response, body) {
    //   console.log(body)
    var info = JSON.parse(body);
    // console.log(info)
    if (!err) {
      console.log('callback called');
      callback(info);
    } else {
      console.log('error cb called');
      console.log(err);
      error({ err: err, success: false });
      // error.success = false
      //   res.status(500).json(error)
    }
  });
}
//# sourceMappingURL=payments.js.map