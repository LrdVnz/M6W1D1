const nodemailer = require("nodemailer");

const message = {
  from: "emelia.jakubowski@ethereal.email",
  to: "example@email.com",
  subject: "Email di prova",
  text: "Versione di testo del messaggio",
};

async function sendEmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "emelia.jakubowski@ethereal.email",
        pass: "d8tWnp1XZ3wkhdaFbF",
      },
    });

    const mail = await transporter.sendMail(message);

    console.log(mail);
  } catch (err) {
    console.log(err);
  }
}

module.exports = sendEmail; 