import nodemailer from "nodemailer";
import "dotenv/config";

export const sendGMail = (param: nodemailer.SendMailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    host: "smtp.gmail.com",
    secure: true,
    requireTLS: true,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.MAILER_EMAIL,
    to: param.to,
    subject: param.subject,
    text: param.text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(`Failed to send mail = [${err.name}] ${err.message}`);
      return false;
    } else console.log(`Successed to send mail - [${info.messageId}] ${info.response}`);
  });
  return true;
};
