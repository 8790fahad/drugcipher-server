export function passwordReset(unique, user) {
    return `
      <h4>Hello,</h4>
      <p>
        We have received a request to reset your BitCoops account password. 
        Your username is <b>${user.username}</b>,
        Use the link below to reset your password:
      </p>
      <p>
        https://app.bitcoops.com/reset-password?id=${unique}
      </p>
      <p>
        This link is valid for the next 72 hours. If it has expired, 
        you can request for a new link by clicking here.
      <p/>
      <p>
        If you did not intend to reset your password, please ignore 
        this email and your password will not change.
      </p>
      <br />
      <p>Do let us know if you are experiencing any difficulty at any point. Thank you.</p>
      <p>For any question, you can reply to this mail or contact us through +2349064240961.</p>
      <br />
      <p>Thanks.</p>
      <p>BitCoops Support</p>
      `;
  }
  