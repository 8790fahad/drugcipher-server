"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateKycApi = exports.getPendingKYCApi = exports.newsLetterFun = exports.kycFun = undefined;

var kycFun = exports.kycFun = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var _ref2$company_name = _ref2.company_name,
        company_name = _ref2$company_name === undefined ? "" : _ref2$company_name,
        _ref2$company_address = _ref2.company_address,
        company_address = _ref2$company_address === undefined ? "" : _ref2$company_address,
        _ref2$company_email = _ref2.company_email,
        company_email = _ref2$company_email === undefined ? "" : _ref2$company_email,
        _ref2$company_phone = _ref2.company_phone,
        company_phone = _ref2$company_phone === undefined ? "" : _ref2$company_phone,
        _ref2$company_website = _ref2.company_website,
        company_website = _ref2$company_website === undefined ? "" : _ref2$company_website,
        _ref2$company_country = _ref2.company_country,
        company_country = _ref2$company_country === undefined ? "" : _ref2$company_country,
        _ref2$logo_url = _ref2.logo_url,
        logo_url = _ref2$logo_url === undefined ? "" : _ref2$logo_url,
        _ref2$pl_url = _ref2.pl_url,
        pl_url = _ref2$pl_url === undefined ? "" : _ref2$pl_url,
        _ref2$sp_url = _ref2.sp_url,
        sp_url = _ref2$sp_url === undefined ? "" : _ref2$sp_url,
        _ref2$query_type = _ref2.query_type,
        query_type = _ref2$query_type === undefined ? "" : _ref2$query_type,
        _ref2$companyId = _ref2.companyId,
        companyId = _ref2$companyId === undefined ? "" : _ref2$companyId;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              _models2.default.sequelize.query("call kyc(:company_name,:company_address,:company_email,:company_phone,:company_website,:company_country,:logo_url,:query_type,:pl_url,:sp_url,:companyId)", {
                replacements: {
                  company_name: company_name,
                  company_address: company_address,
                  company_email: company_email,
                  company_phone: company_phone,
                  company_website: company_website,
                  company_country: company_country,
                  logo_url: logo_url,
                  pl_url: pl_url,
                  sp_url: sp_url,
                  query_type: query_type,
                  companyId: companyId
                }
              });
            } catch (error) {
              console.log(error);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function kycFun(_x) {
    return _ref.apply(this, arguments);
  };
}();

var newsLetterFun = exports.newsLetterFun = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref4) {
    var _ref4$email = _ref4.email,
        email = _ref4$email === undefined ? "" : _ref4$email;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            try {
              _models2.default.sequelize.query("call news_letter(:email)", {
                replacements: {
                  email: email
                }
              });
            } catch (error) {
              console.log(error);
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function newsLetterFun(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var getPendingKYCApi = exports.getPendingKYCApi = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref6) {
    var _ref6$query_type = _ref6.query_type,
        query_type = _ref6$query_type === undefined ? "" : _ref6$query_type,
        _ref6$pass_phrase = _ref6.pass_phrase,
        pass_phrase = _ref6$pass_phrase === undefined ? "" : _ref6$pass_phrase;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _models2.default.sequelize.query("call get_pending_company(:query_type,:pass_phrase)", {
              replacements: {
                query_type: query_type,
                pass_phrase: pass_phrase
              }
            });

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);

            console.log(_context3.t0);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 6]]);
  }));

  return function getPendingKYCApi(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

var updateKycApi = exports.updateKycApi = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref8) {
    var _ref8$url = _ref8.url,
        url = _ref8$url === undefined ? "" : _ref8$url,
        _ref8$query_type = _ref8.query_type,
        query_type = _ref8$query_type === undefined ? "" : _ref8$query_type,
        _ref8$id = _ref8.id,
        id = _ref8$id === undefined ? "" : _ref8$id,
        _ref8$pass_phrase = _ref8.pass_phrase,
        pass_phrase = _ref8$pass_phrase === undefined ? "" : _ref8$pass_phrase;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            try {
              _models2.default.sequelize.query("call update_kyc(:id , :query_type, :url,:pass_phrase  )", {
                replacements: {
                  id: id,
                  url: url,
                  query_type: query_type,
                  pass_phrase: pass_phrase
                }
              });
            } catch (error) {
              console.log(error);
            }

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function updateKycApi(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=kyc.js.map