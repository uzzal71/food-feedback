import nodemailer from "nodemailer";
import { registerTemplate } from "./template/registration";

export const sendMail = async (receiver, subject, data) => {
    try {
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: `${process.env.EMAIL_USER}`,
            pass: `${process.env.EMAIL_PASS}`
          }
        });
    
        let info = await transporter.sendMail({
          from: `${process.env.EMAIL_USER}`,
          to: `${receiver}`,
          subject: `${subject}`,
          html: registerTemplate(data)
        });
    
        console.log('Message sent: %s', info.messageId);
        return true
      } catch (error) {
        console.error(error);
        return false;
      }
};