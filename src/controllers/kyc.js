import { kycFun } from "../query/kyc";

export const createCompony = (req, res) => {
  console.log(req.body);
  const {
    companyName = "",
    companyAddress = "",
    companyCountry = "",
    CompanyEmail = "",
    companyWebsite = "",
    companyEmail = "",
  } = req.body;
  kycFun({
    company_name: companyName,
    company_address: companyAddress,
    company_email: companyCountry,
    company_phone: CompanyEmail,
    company_website: companyWebsite,
    company_country: companyEmail,
    query_type: "insert",
  })
    .then((company) => {
      res.json({ company, success: true });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};
