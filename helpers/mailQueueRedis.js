import Queue from "bull"
import nodemailer from "nodemailer";

import { registerTemplate } from './template/registration';

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: `${process.env.EMAIL_USER}`,
    pass: `${process.env.EMAIL_PASS}`
  }
});


const emailQueue = new Queue('emailQueue', {
  redis: {
    port: 6379,
    host: '127.0.0.1'
  }
});


emailQueue.process(async (job) => {
  const { to, subject, html } = job.data;

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`,
    to: to,
    subject: subject,
    html: html
  });

  console.log('Message sent: %s', info.messageId);
});


export const sendMail = async (data) => {
  try {
    const { recipients } = req.body;

    const jobs =  emailQueue.add({
        to: `${receiver}`,
        subject: `${subject}`,
        html: registerTemplate(data)
    });

    await Promise.all(jobs);

    return true
  } catch (error) {
    console.error(error);
    return false;
  }
};