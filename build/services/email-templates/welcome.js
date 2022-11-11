'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.welcomeMail = welcomeMail;

var _society = require('../../controllers/society');

function welcomeMail() {
        var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var society = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var confirmation_id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        return '\n          <center>\n            <img src=\'https://res.cloudinary.com/emaitee/image/upload/v1604870913/PharmPay/icon-transparent.png\'\n            height=\'80px\' width=\'80px\' />\n          </center>\n  \n          <h3>Warm welcome, ' + user.firstname + ' ' + user.lastname + '</h3>\n          <h4>Thank you for registering with BitCoops</h4>\n\n          <p>A cooperative account has been created for ' + society.society_name + ' which\n          now has you as the admin.</p>\n  \n          <p>Please verify your email address here: <a>' + _society.appLink + '/email-confirmation?confirmation_id=' + confirmation_id + '</a></p>      \n          \n  \n          <p>Do let us know if you are experiencing any difficulty at any point. Thank you.</p>\n          <p>For any question, you can reply to this mail or contact us through +2349064240961.</p>\n          <br />\n  \n  \n          <p>Best regards.</p>\n          <p>PharmPay Support</p>\n      ';
}
//# sourceMappingURL=welcome.js.map