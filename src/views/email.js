import fetch from "cross-fetch";

export let mailOptions = ({
  emailTo = "",
  templateName = "",
  context = {},
  subject = "",
}) => {
  return {
    from: '"DrugCipher" <drucipher@gmail.com>', // sender address
    to: emailTo, // list of receivers
    subject: subject,
    template: templateName, // the name of the template file i.e email.handlebars
    context: context,
  };
};

export const postMailReg = (
  url,
  data = {},
  success = (f) => f,
  error = (f) => f
) => {
  fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
  })
    .then((raw) => raw.json())
    .then((response) => success(response))
    .catch((err) => error(err));
};

export const postMailCom = (
  url,
  data = {},
  success = (f) => f,
  error = (f) => f
) => {
  fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
  })
    .then((raw) => raw.json())
    .then((response) => success(response))
    .catch((err) => error(err));
};