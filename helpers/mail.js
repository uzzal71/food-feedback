import nodemailer from "nodemailer";
import { registerTemplate } from "./template/registration";

export const sendMail = async (receiver, subject, data) => {
    try {
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'nilsagortechnology@gmail.com',
            pass: 'tkidnnplnrecsnez'
          }
        });
    
        let info = await transporter.sendMail({
          from: 'nilsagortechnology@gmail.com',
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