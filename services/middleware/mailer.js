const nodemailer = require("nodemailer");

//creare middleware con req res etc !
async function sendEmail(req, res, next) {

  console.log(req.body)

const message = {
  from: "emelia.jakubowski@ethereal.email",
  to: req.body.author.email,
  subject: "Email di prova",
  text: "Versione di testo del messaggio",
};

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'katelin.murray@ethereal.email',
          pass: 'nuSPEJDHAQhCaQ8Yy6'
      }
  });

    const mail = await transporter.sendMail(message);

    next()
    console.log(mail);
  } catch (err) {
    console.log(err);
    next()
  }
}

module.exports = sendEmail; 