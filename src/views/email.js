export let mailOptions = ({
  emailTo = "",
  templateName = "",
  context = {},
}) => {
  return {
    from: '"Drug Cipher" <8790fahadado@gmail.com>', // sender address
    to: emailTo, // list of receivers
    subject: "Registration Completed",
    template: templateName, // the name of the template file i.e email.handlebars
    context: context,
  };
};
