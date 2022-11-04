import { generatePassPhrase } from "passphrase-generator";
import { transporter } from "..";
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
  getPendingKYCApi()
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
      subject:"successfully Registration",
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
  let passPhrase = generatePassPhrase(10);
  let pass = passPhrase.length ? passPhrase.join() : null;
  let link = `www.drugcipher.com/pawork?pass=${pass}`;
  transporter.sendMail(
    mailOptions({
      emailTo: company_email,
      templateName: "congrate",
      subject:"Registration Completed",
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
        updateKycApi({ id, query_type: "ap", pass_phrase: pass })
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
      subject:"Registration Status",
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
