"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mailOptions = exports.mailOptions = function mailOptions(_ref) {
  var _ref$emailTo = _ref.emailTo,
      emailTo = _ref$emailTo === undefined ? "" : _ref$emailTo,
      _ref$templateName = _ref.templateName,
      templateName = _ref$templateName === undefined ? "" : _ref$templateName,
      _ref$context = _ref.context,
      context = _ref$context === undefined ? {} : _ref$context,
      _ref$subject = _ref.subject,
      subject = _ref$subject === undefined ? '' : _ref$subject;

  return {
    from: '"Drug Cipher" <8790fahadado@gmail.com>', // sender address
    to: emailTo, // list of receivers
    subject: subject,
    template: templateName, // the name of the template file i.e email.handlebars
    context: context
  };
};
//# sourceMappingURL=email.js.map