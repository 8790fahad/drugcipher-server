"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadWithToken = exports.recoverAccount = exports.regeneratePassPhrase = exports.updateKycReject = exports.updateKycAppproved = exports.updateKycSP = exports.getPendingKYC = exports.updateKycPL = exports.createNewsLetterFun = exports.createCompony = undefined;

var _passphraseGenerator = require("passphrase-generator");

var _ = require("..");

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _kyc = require("../query/kyc");

var _email = require("../views/email");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var createCompony = exports.createCompony = function createCompony(req, res) {
  var _req$body = req.body,
      _req$body$companyName = _req$body.companyName,
      companyName = _req$body$companyName === undefined ? "" : _req$body$companyName,
      _req$body$companyAddr = _req$body.companyAddress,
      companyAddress = _req$body$companyAddr === undefined ? "" : _req$body$companyAddr,
      _req$body$companyCoun = _req$body.companyCountry,
      companyCountry = _req$body$companyCoun === undefined ? "" : _req$body$companyCoun,
      _req$body$companyWebs = _req$body.companyWebsite,
      companyWebsite = _req$body$companyWebs === undefined ? "" : _req$body$companyWebs,
      _req$body$companyEmai = _req$body.companyEmail,
      companyEmail = _req$body$companyEmai === undefined ? "" : _req$body$companyEmai,
      _req$body$companyId = _req$body.companyId,
      companyId = _req$body$companyId === undefined ? "" : _req$body$companyId,
      _req$body$companyPhon = _req$body.companyPhone,
      companyPhone = _req$body$companyPhon === undefined ? "" : _req$body$companyPhon;

  (0, _kyc.kycFun)({
    company_name: companyName,
    company_address: companyAddress,
    company_email: companyEmail,
    company_phone: companyPhone,
    company_website: companyWebsite,
    company_country: companyCountry,
    query_type: "insert",
    companyId: companyId
  }).then(function (company) {
    res.json({ company: company, success: true });
  }).catch(function (err) {
    res.status(500).json({ err: err });
  });
};

var createNewsLetterFun = exports.createNewsLetterFun = function createNewsLetterFun(req, res) {
  var email = req.body.email;

  (0, _kyc.newsLetterFun)({ email: email }).then(function (news_letter) {
    res.json({ news_letter: news_letter, success: true });
  }).catch(function (err) {
    res.status(500).json({ err: err });
  });
};

var updateKycPL = exports.updateKycPL = function updateKycPL(req, res) {
  var companyId = req.query.companyId;

  var url = req.file ? req.file.path : null;
  (0, _kyc.updateKycApi)({ id: companyId, url: url, query_type: "pl" }).then(function (resp) {
    res.json({ resp: resp, success: true });
  }).catch(function (err) {
    res.status(500).json({ err: err });
  });
};

var getPendingKYC = exports.getPendingKYC = function getPendingKYC(req, res) {
  _objectDestructuringEmpty(req.body);

  (0, _kyc.getPendingKYCApi)({ query_type: "gpc", pass_phrase: "" }).then(function (resp) {
    res.json({ result: resp, success: true });
  }).catch(function (err) {
    res.status(500).json({ err: err });
  });
};

var updateKycSP = exports.updateKycSP = function updateKycSP(req, res) {
  var _req$query = req.query,
      companyId = _req$query.companyId,
      _req$query$companyEma = _req$query.companyEmail,
      companyEmail = _req$query$companyEma === undefined ? "" : _req$query$companyEma,
      _req$query$companyNam = _req$query.companyName,
      companyName = _req$query$companyNam === undefined ? "" : _req$query$companyNam;

  var url = req.file ? req.file.path : null;
  _.transporter.sendMail((0, _email.mailOptions)({
    emailTo: companyEmail,
    templateName: "thanks",
    subject: "successfully Registration",
    context: { company_name: companyName }
  }), function (error, info) {
    if (error) {
      res.status(500).json({ error: error });
      console.log(error);
    } else {
      (0, _kyc.updateKycApi)({ id: companyId, url: url, query_type: "sp" }).then(function (resp) {
        res.json({ resp: resp, success: true, info: info });
      }).catch(function (err) {
        res.status(500).json({ err: err });
      });
    }
  });
};

var updateKycAppproved = exports.updateKycAppproved = function updateKycAppproved(req, res) {
  var _req$body2 = req.body,
      id = _req$body2.id,
      _req$body2$company_em = _req$body2.company_email,
      company_email = _req$body2$company_em === undefined ? "" : _req$body2$company_em,
      _req$body2$company_na = _req$body2.company_name,
      company_name = _req$body2$company_na === undefined ? "" : _req$body2$company_na;

  var passPhrase = (0, _passphraseGenerator.generatePassPhrase)(15);
  var pass = passPhrase.length ? passPhrase.join() : null;
  var link = "www.drugcipher.com/account/passphrass?id=" + id + "&pass=" + pass;
  _.transporter.sendMail((0, _email.mailOptions)({
    emailTo: company_email,
    templateName: "congrate",
    subject: "Registration Completed",
    context: {
      company_name: company_name,
      link: link.replace(/[,\s]+|[,\s]+/g, "%20")
    }
  }), function (error, info) {
    if (error) {
      res.status(500).json({ error: error });
      console.log(error);
    } else {
      (0, _kyc.updateKycApi)({
        id: id,
        query_type: "ap",
        pass_phrase: pass.replace(/[,\s]+|[,\s]+/g, " ")
      }).then(function (resp) {
        res.json({ resp: resp, success: true, info: info });
      }).catch(function (err) {
        res.status(500).json({ err: err });
      });
    }
  });
};

var updateKycReject = exports.updateKycReject = function updateKycReject(req, res) {
  var _req$body3 = req.body,
      id = _req$body3.id,
      _req$body3$company_em = _req$body3.company_email,
      company_email = _req$body3$company_em === undefined ? "" : _req$body3$company_em,
      _req$body3$company_na = _req$body3.company_name,
      company_name = _req$body3$company_na === undefined ? "" : _req$body3$company_na;

  var link = "www.drugcipher.com";
  _.transporter.sendMail((0, _email.mailOptions)({
    emailTo: company_email,
    templateName: "reject",
    subject: "Registration Status",
    context: {
      company_name: company_name,
      link: link
    }
  }), function (error, info) {
    if (error) {
      res.status(500).json({ error: error });
      console.log(error);
    } else {
      (0, _kyc.updateKycApi)({ id: id, query_type: "rj", pass_phrase: pass }).then(function (resp) {
        res.json({ resp: resp, success: true, info: info });
      }).catch(function (err) {
        res.status(500).json({ err: err });
      });
    }
  });
};

var regeneratePassPhrase = exports.regeneratePassPhrase = function regeneratePassPhrase(req, res) {
  var id = req.query.id;

  var passPhrase = (0, _passphraseGenerator.generatePassPhrase)(15);
  var pass = passPhrase.length ? passPhrase.join() : null;
  (0, _kyc.updateKycApi)({
    id: id,
    query_type: "gn",
    pass_phrase: pass.replace(/[,\s]+|[,\s]+/g, " ")
  }).then(function (resp) {
    res.json({
      resp: resp,
      success: true,
      pass: pass.replace(/[,\s]+|[,\s]+/g, "%20")
    });
  }).catch(function (err) {
    res.status(500).json({ err: err });
  });
};

var recoverAccount = exports.recoverAccount = function recoverAccount(req, res) {
  var passPhrase = req.body.passPhrase;

  (0, _kyc.getPendingKYCApi)({ pass_phrase: passPhrase, query_type: "recover" }).then(function (resp) {
    //check for account
    if (!resp.length) {
      return res.json({ message: "Account not found!" });
    } else {
      var payload = { passPhrase: passPhrase }; //jwt payload
      _jsonwebtoken2.default.sign(payload, "secret", {
        expiresIn: "30d"
      }, function (err, token) {
        res.json({
          success: true,
          token: "Bearer " + token,
          info: resp[0]
        });
      });
    }
  }).catch(function (err) {
    res.status(500).json({ err: err });
  });
};

var loadWithToken = exports.loadWithToken = function loadWithToken(req, res) {
  var token = req.query.token;

  _jsonwebtoken2.default.verify(token, "secret", function (err, decoded) {
    if (decoded) {
      (0, _kyc.getPendingKYCApi)({
        pass_phrase: decoded.passPhrase,
        query_type: "recover"
      }).then(function (resp) {
        res.json({
          success: true,
          info: resp[0]
        });
      }).catch(function (err) {
        res.status(500).json({ err: err });
      });
    } else {
      res.json({
        success: false
      });
    }
  });
};
//# sourceMappingURL=kyc.js.map