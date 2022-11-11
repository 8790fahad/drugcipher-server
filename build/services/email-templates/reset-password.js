"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordReset = passwordReset;
function passwordReset(unique, user) {
  return "\n      <h4>Hello,</h4>\n      <p>\n        We have received a request to reset your BitCoops account password. \n        Your username is <b>" + user.username + "</b>,\n        Use the link below to reset your password:\n      </p>\n      <p>\n        https://app.bitcoops.com/reset-password?id=" + unique + "\n      </p>\n      <p>\n        This link is valid for the next 72 hours. If it has expired, \n        you can request for a new link by clicking here.\n      <p/>\n      <p>\n        If you did not intend to reset your password, please ignore \n        this email and your password will not change.\n      </p>\n      <br />\n      <p>Do let us know if you are experiencing any difficulty at any point. Thank you.</p>\n      <p>For any question, you can reply to this mail or contact us through +2349064240961.</p>\n      <br />\n      <p>Thanks.</p>\n      <p>BitCoops Support</p>\n      ";
}
//# sourceMappingURL=reset-password.js.map