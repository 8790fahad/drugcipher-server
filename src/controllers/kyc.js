import { generatePassPhrase } from "passphrase-generator";
import { transporter } from "..";
require("dotenv").config();
import jwt from "jsonwebtoken";
import {
  getMarketerApi,
  getPendingKYCApi,
  kycFun,
  marketersApi,
  messageApi,
  newsLetterFun,
  updateKycApi,
} from "../query/kyc";
import {
  mailOptions,
  postMailCom,
  postMailReg,
  postMailRej,
} from "../views/email";

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

export const addMessage = (req, res) => {
  const { email = "", message = "", id = "" } = req.body;
  messageApi({ id, email, message })
    .then((resp) => {
      res.json({ resp, success: true });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

export const Addmarketer = (req, res) => {
  console.log(req.body);
  const {
    id = "",
    companyId = "",
    fullName = "",
    email = "",
    phoneNumber = "",
    country = "",
    firstLine = "",
    secondLine = "",
    type = "marketer",
  } = req.body;
  marketersApi({
    name: fullName,
    email,
    phone_number: phoneNumber,
    address: firstLine,
    country,
    second_address: secondLine,
    id,
    company_id: companyId,
    type,
  })
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

export const getMarketer = (req, res) => {
  const { companyId = "", type } = req.query;
  getMarketerApi({ type, company_id: companyId })
    .then((resp) => {
      res.json({ result: resp, success: true });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

export const updateKycSP = (req, res) => {
  const { companyId, companyEmail = "", companyName = "" } = req.query;
  console.log(req.query);
  const url = req.file ? req.file.path : null;
  updateKycApi({ id: companyId, url, query_type: "sp" })
    .then((resp) => {
      postMailReg(
        process.env.URL_REG,
        {
          company: companyName,
          recipient: companyEmail,
        },
        (_resp) => {
          console.log(resp);
          res.json({ _resp, success: true, resp });
        },
        (err) => {
          console.log(err);
          res.status(500).json({ err });
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

export const updateKycAppproved = (req, res) => {
  const { id, company_email = "", company_name = "" } = req.body;
  let passPhrase = generatePassPhrase(15);
  let pass = passPhrase.length ? passPhrase.join() : null;
  let link = `https://app.drugcipher.com/account/passphrass?id=${id}&pass=${pass}`;
  updateKycApi({
    id,
    query_type: "ap",
    pass_phrase: pass.replace(/[,\s]+|[,\s]+/g, " "),
  })
    .then((resp) => {
      postMailCom(
        process.env.URL_COM,
        {
          recipient: company_email,
          company: company_name,
          link: link.replace(/[,\s]+|[,\s]+/g, "%20"),
        },
        (_resp) => {
          console.log(resp);
          res.json({ _resp, success: true, resp });
        },
        (err) => {
          console.log(err);
          res.status(500).json({ err });
        }
      );
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

export const updateKycReject = (req, res) => {
  const { id, company_email = "", company_name = "" } = req.body;
  let link = `https://drugcipher.com`;
  updateKycApi({ id, query_type: "rj" })
    .then((resp) => {
      postMailRej(
        process.env.URL_REJE,
        {
          company: company_name,
          link: link,
          recipient: company_email,
        },
        (_resp) => {
          console.log(resp);
          res.json({ _resp, success: true, resp });
        },
        (err) => {
          console.log(err);
          res.status(500).json({ err });
        }
      );
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
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
