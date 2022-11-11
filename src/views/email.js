export let mailOptions = ({
  emailTo = "",
  templateName = "",
  context = {},
  subject=''
}) => {
  return {
    from: '"DrugCipher" <8790fahadado@gmail.com>', // sender address
    to: emailTo, // list of receivers
    subject: subject,
    template: templateName, // the name of the template file i.e email.handlebars
    context: context,
  };
};
