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
  companyId = "",
}) {
  try {
    db.sequelize.query(
      `call kyc(:company_name,:company_address,:company_email,:company_phone,:company_website,:company_country,:logo_url,:query_type,:pl_url,:sp_url,:companyId)`,
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
          companyId,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function newsLetterFun({ email = "" }) {
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

export async function getPendingKYCApi() {
  try {
    return await db.sequelize.query(`call get_pending_company()`);
  } catch (error) {
    console.log(error);
  }
}

export async function updateKycApi({ url = "", query_type = "", id = "" }) {
  try {
    db.sequelize.query(`call update_kyc(:id , :query_type, :url  )`, {
      replacements: {
        id,
        url,
        query_type,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
