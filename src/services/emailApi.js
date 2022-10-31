import transport from '../config/nodemailer'
import { appConfigApi } from '../queries/misc'
import { usersApi } from '../queries/users'
import path from 'path'


export function sendMail({ email, subject, html }) {
  transport
    .sendMail({
      from: 'BitCoops',
      to: email,
      subject,
      html,
    })
    .then((info) => {
      console.log('Message sent: %s', info.messageId)
    })
    .catch((err) => console.log('Error', err))
}

export function sendMail2({ userId, subject, html }) {
  usersApi(
    {
      id: userId,
      query_type: 'info',
    },
    (data) => {
      let userInfo = data[0]
      appConfigApi({ query_type: 'email' }).then((configObj) => {
        console.log('Email config: ', configObj)

        const transporter = nodemailer.createTransport(
          smtpTransport({
            host: configObj.email_host,
            port: configObj.email_port,
            secure: configObj.email_secure, // secure:true for port 465, secure:false for port 587
            auth: {
              user: configObj.email_auth_username,
              pass: configObj.email_auth_password,
            },
          }),
        )

        transporter
          .sendMail({
            from: 'BitCoops',
            to: userInfo.email,
            subject,
            html,
          })
          .then((info) => {
            console.log('Message sent: %s', info.messageId)
          })
          .catch((err) => console.log('Error', err))
      })
    },
    (e) => {
      console.log(e)
    },
  )
}
