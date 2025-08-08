require("dotenv").config();

let sendEmail;

if (process.env.USE_SENDGRID === "true") {
  // Configuração SendGrid
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  sendEmail = (msg) => {
    return sgMail.send(msg);
  };
} else {
  // Configuração Nodemailer SMTP
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  sendEmail = (msg) => {
    return transporter.sendMail(msg);
  };
}

module.exports = sendEmail;
