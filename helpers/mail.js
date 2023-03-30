import nodemailer from "nodemailer";

export const sendMail = async () => {
    try {
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
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Sender Name" <sender_email@gmail.com>', // sender address
          to: 'recipient_email@gmail.com', // list of receivers
          subject: 'Hello ✔', // Subject line
          text: 'Hello world?', // plain text body
          html: '<b>Hello world?</b>' // html body
        });
    
        console.log('Message sent: %s', info.messageId);
        res.send('Email sent successfully');
      } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
      }
};