const nodemailer = require('nodemailer');
const sendEmail = async (options) => {
  //create Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //Mail Options
  const mailOptions = {
    from: 'Ahmed <ahmed@io.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //sending email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
