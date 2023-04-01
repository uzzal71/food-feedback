import Queue from "bull";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";
import { registerTemplate } from './template/registration';

const mongoUrl = 'mongodb+srv://Uzzalroy_96:Uzzalroy_96@cluster0.ysa2z.mongodb.net/FoodFeedback?retryWrites=true&w=majority';
const client = new MongoClient(mongoUrl);

async function connectToDb() {
  await client.connect();
  const db = client.db();
  return db;
}

const emailQueue = new Queue('emailQueue', {
  createClient: () => connectToDb(),
  createClient: null,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true
  }
});


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: `${process.env.EMAIL_USER}`,
    pass: `${process.env.EMAIL_PASS}`
  }
});

const sendMail = async (to, subject, html) => {
  const info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`,
    to,
    subject,
    html
  });
  
  console.log('Message sent: %s', info.messageId);
}

emailQueue.process(async (job) => {
  const { to, subject, html } = job.data;
  console.log(job)
  try {
    await sendMail(to, subject, html);
    return true;
  } catch (err) {
    console.error(`Error sending email: ${err}`);
    return false;
  }
});

export const sendMailQueue = async(to, subject, html) => {
  try {
    const job = await emailQueue.add({ to, subject, html });
    console.log(`Job ${job.id} added to the queue`);
    return true;
  } catch (err) {
    console.error(`Error adding job to queue: ${err}`);
    return false;
  }
}