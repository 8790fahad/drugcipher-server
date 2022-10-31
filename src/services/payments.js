import request from 'request'

export const FLUTTERWAVE_BASE_URL = 'https://api.flutterwave.com/v3'
export const RAVE_BASE_URL = 'https://api.ravepay.co/v2'
export const PAYSTACK_BASE_URL = 'https://api.paystack.co'
export const FW_SECRET_KEY = 'FLWSECK-278f7fde7290a11a144751d3410fb7d8-X'

export function getBankList(callback = (f) => f, error = (f) => f) {
  const options = {
    method: 'GET',
    url: `${FLUTTERWAVE_BASE_URL}/banks/NG`,
    headers: {
      Authorization: `Bearer ${FW_SECRET_KEY}`,
    },
  }

  request(options, (err, response, body) => {
    //   console.log(body)
    const info = JSON.parse(body)
    // console.log(info)
    if (!err) {
      console.log('callback called')
      callback(info)
    } else {
      console.log('error cb called')
      console.log(err)
      error({ err, success: false })
      // error.success = false
      //   res.status(500).json(error)
    }
  })
}

export function createSubAccount(
  data = {},
  callback = (f) => f,
  error = (f) => f,
  user,
) {
  let obj = {
    account_bank: data.bank_code,
    account_number: data.account_no.toString().padStart(10, '0'),
    business_name: data.description,
    business_email: 'pharmpayng@gmail.com',
    business_contact: data.description,
    business_contact_mobile: data.user_phone,
    business_mobile: data.user_phone,
    country: 'NG',
    split_type: 'flat',
    split_value: data.amount,
  }

  // console.log(obj)

  const options = {
    method: 'POST',
    url: `${FLUTTERWAVE_BASE_URL}/subaccounts`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${FW_SECRET_KEY}`,
    },
    body: JSON.stringify(obj),
  }

  request(options, (err, response, body) => {
    //   console.log(body)
    const info = JSON.parse(body)
    // console.log(info)
    if (!err) {
      console.log('callback called')
      callback(info)
    } else {
      console.log('error cb called')
      console.log(err)
      error({ err, success: false })
      // error.success = false
      //   res.status(500).json(error)
    }
  })
}
