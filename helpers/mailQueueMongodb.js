import Queue from "bull";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

import { registerTemplate } from './template/registration';

const EMAIL_USER = 'nilsagortechnology@gmail.com';
const EMAIL_PASS = 'tkidnnplnrecsnez';
const MONGOMAIL_URI = 'mongodb+srv://Uzzalroy_96:Uzzalroy_96@cluster0.ysa2z.mongodb.net/FoodFeedback?retryWrites=true&w=majority';

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: `${EMAIL_USER}`,
    pass: `${EMAIL_PASS}`
  }
});


const emailQueue = new Queue('emailQueue', {
  createClient: () => MongoClient.connect(`${MONGOMAIL_URI}`),
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true
  }
});


emailQueue.process(async (job) => {
  const { to, subject, html } = job.data;


  let info = await transporter.sendMail({
    from: `${EMAIL_USER}`,
    to: to,
    subject: subject,
    html: html
  });

  console.log('Message sent: %s', info.messageId);
});


export const sendMail = async (data) => {
  try {
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