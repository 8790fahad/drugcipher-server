import { generatePassPhrase } from "passphrase-generator";
import { transporter } from "..";
import jwt from "jsonwebtoken";
import {
  getPendingKYCApi,
  kycFun,
  newsLetterFun,
  updateKycApi,
} from "../query/kyc";
import { mailOptions } from "../views/email";

export const createCompony = (req, res) => {
  const {
    companyName = "",
    companyAddress = "",
    companyCountry = "",
    companyWebsite = "",
    companyEmail = "",
    companyId = "",
    companyPhone = "",
  } = req.body;
  kycFun({
    company_name: companyName,
    company_address: companyAddress,
    company_email: companyEmail,
    company_phone: companyPhone,
    company_website: companyWebsite,
    company_country: companyCountry,
    query_type: "insert",
    companyId: companyId,
  })
    .then((company) => {
      res.json({ company, success: true });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

export const createNewsLetterFun = (req, res) => {
  const { email } = req.body;
  newsLetterFun({ email })
    .then((news_letter) => {
      res.json({ news_letter, success: true });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

export const updateKycPL = (req, res) => {
  const { companyId } = req.query;
  const url = req.file ? req.file.path : null;
  updateKycApi({ id: companyId, url, query_type: "pl" })
    .then((resp) => {
      res.json({ resp, success: true });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

export const getPendingKYC = (req, res) => {
  const {} = req.body;
  getPendingKYCApi({ query_type: "gpc", pass_phrase: "" })
    .then((resp) => {
      res.json({ result: resp, success: true });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

export const updateKycSP = (req, res) => {
  const { companyId, companyEmail = "", companyName = "" } = req.query;
  const url = req.file ? req.file.path : null;
  transporter.sendMail(
    mailOptions({
      emailTo: companyEmail,
      templateName: "thanks",
      subject: "successfully Registration",
      context: { company_name: companyName },
    }),
    function (error, info) {
      if (error) {
        res.status(500).json({ error });
        console.log(error);
      } else {
        updateKycApi({ id: companyId, url, query_type: "sp" })
          .then((resp) => {
            res.json({ resp, success: true, info });
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      }
    }
  );
};

export const updateKycAppproved = (req, res) => {
  const { id, company_email = "", company_name = "" } = req.body;
  let passPhrase = generatePassPhrase(15);
  let pass = passPhrase.length ? passPhrase.join() : null;
  let link = `www.drugcipher.com/account/passphrass?id=${id}&pass=${pass}`;
  transporter.sendMail(
    mailOptions({
      emailTo: company_email,
      templateName: "congrate", 
      subject: "Registration Completed",
      context: {
        company_name: company_name,
        link: link.replace(/[,\s]+|[,\s]+/g, "%20"),
      },
    }),
    function (error, info) {
      if (error) {
        res.status(500).json({ error });
        console.log(error);
      } else {
        updateKycApi({
          id,
          query_type: "ap",
          pass_phrase: pass.replace(/[,\s]+|[,\s]+/g, " "),
        })
          .then((resp) => {
            res.json({ resp, success: true, info });
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      }
    }
  );
};

export const updateKycReject = (req, res) => {
  const { id, company_email = "", company_name = "" } = req.body;
  let link = `www.drugcipher.com`;
  transporter.sendMail(
    mailOptions({
      emailTo: company_email,
      templateName: "reject",
      subject: "Registration Status",
      context: {
        company_name: company_name,
        link: link,
      },
    }),
    function (error, info) {
      if (error) {
        res.status(500).json({ error });
        console.log(error);
      } else {
        updateKycApi({ id, query_type: "rj", pass_phrase: pass })
          .then((resp) => {
            res.json({ resp, success: true, info });
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      }
    }
  );
};

export const regeneratePassPhrase = (req, res) => {
  const { id } = req.query;
  let passPhrase = generatePassPhrase(15);
  let pass = passPhrase.length ? passPhrase.join() : null;
  updateKycApi({
    id,
    query_type: "gn",
    pass_phrase: pass.replace(/[,\s]+|[,\s]+/g, " "),
  })
    .then((resp) => {
      res.json({
        resp,
        success: true,
        pass: pass.replace(/[,\s]+|[,\s]+/g, "%20"),
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

export const recoverAccount = (req, res) => {
  const { passPhrase } = req.body;
  getPendingKYCApi({ pass_phrase: passPhrase, query_type: "recover" })
    .then((resp) => {
      //check for account
      if (!resp.length) {
        return res.json({ message: "Account not found!" });
      } else {
        const payload = { passPhrase }; //jwt payload
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: "30d",
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              info: resp[0],
            });
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

export const loadWithToken = (req, res) => {
  const { token } = req.query;
  jwt.verify(token, "secret", function (err, decoded) {
    if (decoded) {
      getPendingKYCApi({
        pass_phrase: decoded.passPhrase,
        query_type: "recover",
      })
        .then((resp) => {
          res.json({
            success: true,
            info: resp[0],
          });
        })
        .catch((err) => {
          res.status(500).json({ err });
        });
    } else {
      res.json({
        success: false,
      });
    }
  });
};
