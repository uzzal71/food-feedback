const { Queue } = require('bull');
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your_email@gmail.com', // sender's email address
    pass: 'your_password' // sender's email password
  }
});

// create a new queue for sending emails
const emailQueue = new Queue('emailQueue', {
  redis: {
    port: 6379,
    host: '127.0.0.1'
  }
});

// define a job to send an email
emailQueue.process(async (job) => {
  const { to, subject, html } = job.data;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Sender Name" <sender_email@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html // html body
  });

  console.log('Message sent: %s', info.messageId);
});

// define a route to trigger the email queue
app.post('/send-emails', async (req, res) => {
  try {
    const { recipients } = req.body;

    // create jobs for each recipient
    const jobs = recipients.map(recipient => {
      return emailQueue.add({
        to: recipient.email,
        subject: 'Sample Email Subject',
        html: '<!-- your HTML email template -->'
      });
    });

    // wait for all jobs to complete
    await Promise.all(jobs);

    res.send('Emails sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending emails');
  }
});