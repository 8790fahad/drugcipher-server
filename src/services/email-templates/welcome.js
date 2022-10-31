import { appLink } from '../../controllers/society'

export function welcomeMail(user = {}, society = {}, confirmation_id = '') {
  return `
          <center>
            <img src='https://res.cloudinary.com/emaitee/image/upload/v1604870913/PharmPay/icon-transparent.png'
            height='80px' width='80px' />
          </center>
  
          <h3>Warm welcome, ${user.firstname} ${user.lastname}</h3>
          <h4>Thank you for registering with BitCoops</h4>

          <p>A cooperative account has been created for ${society.society_name} which
          now has you as the admin.</p>
  
          <p>Please verify your email address here: <a>${appLink}/email-confirmation?confirmation_id=${confirmation_id}</a></p>      
          
  
          <p>Do let us know if you are experiencing any difficulty at any point. Thank you.</p>
          <p>For any question, you can reply to this mail or contact us through +2349064240961.</p>
          <br />
  
  
          <p>Best regards.</p>
          <p>PharmPay Support</p>
      `
}
