import db from "../models";

export async function kycFun({
  company_name = "",
  company_address = "",
  company_email = "",
  company_phone = "",
  company_website = "",
  company_country = "",
  logo_url = "",
  pl_url = "",
  sp_url = "",
  query_type = "",
}) {
  try {
    db.sequelize.query(
      `call kyc(:company_name,:company_address,:company_email,:company_phone,:company_website,:company_country,:logo_url,:query_type,:pl_url,:sp_url)`,
      {
        replacements: {
          company_name,
          company_address,
          company_email,
          company_phone,
          company_website,
          company_country,
          logo_url,
          pl_url,
          sp_url,
          query_type,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function newsLetterFun({ data = {} }) {
  const {} = data;
  try {
    db.sequelize.query(`call news_letter(:email)`, {
      replacements: {
        email,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
