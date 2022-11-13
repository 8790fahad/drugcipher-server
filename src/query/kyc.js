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

export async function messageApi({ email = "", message = "", id = "" }) {
  try {
    db.sequelize.query(`call add_message(:email ,:message,:id)`, {
      replacements: {
        email,
        message,
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function marketersApi({
  name = "",
  email = "",
  phone_number = "",
  address = "",
  country = "",
  second_address = "",
  id = "",
  company_id = "",
  type=''
}) {
  try {
    db.sequelize.query(
      `call marketers(:name,:email,:phone_number,:address,:country,:second_address,:id,:company_id,:type)`,
      {
        replacements: {
          name,
          email,
          phone_number,
          address,
          country,
          second_address,
          id,
          company_id,
          type
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function getPendingKYCApi({ query_type = "", pass_phrase = "" }) {
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

export async function getMarketerApi({ type = "", company_id = "" }) {
  try {
    return await db.sequelize.query(
      `call get_marketers(:type,:company_id)`,
      {
        replacements: {
          type, 
          company_id,
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
