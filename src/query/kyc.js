"use strict";

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

export async function getPendingKYCApi({
  query_type = "",
  pass_phrase = "",
}) {
  try {
    return await db.sequelize.query(
      `call get_pending_company(:query_type,:pass_phrase)`,
      {
        replacements: {
          query_type,
          pass_phrase,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function updateKycApi({
  url = "",
  query_type = "",
  id = "",
  pass_phrase = "",
}) {
  try {
    db.sequelize.query(
      `call update_kyc(:id , :query_type, :url,:pass_phrase  )`,
      {
        replacements: {
          id,
          url,
          query_type,
          pass_phrase,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

