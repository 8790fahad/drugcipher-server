const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  host: 'mail.yge.wvi.mybluehost.me',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: 'no-reply-bitscoops@yge.wvi.mybluehost.me',
    pass: 'BitsCoops_2022',
  },
  tls: {
    rejectUnauthorized: false,
  },
})

module.exports = transport
