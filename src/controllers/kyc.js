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
    company_email: companyCountry,
    company_phone: companyPhone,
    company_website: companyWebsite,
    company_country: companyEmail,
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
