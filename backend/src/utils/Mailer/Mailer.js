const nodemailer = require("nodemailer");

class Mailer {
  transporter;
  email;

  constructor () {
    this.email = process.env.MAILER_EMAIL
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.email,
        pass: process.env.MAILER_PASSWORD,
      },
    });
  }

  sendEmail = (to, payload) => {
    const message = {
      from: `NTU FYP Mailer <${this.email}>`,
      to,
      ...payload,
    };
    return this.transporter.sendMail(message)
  }
}

module.exports = new Mailer()