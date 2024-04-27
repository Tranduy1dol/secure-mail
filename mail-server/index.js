const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

dotenv.config()   // configure our app to use env variables
const app = express();
/** middlewares */
app.use(express.json());
app.use(cors());
app.disable('x-powered-by'); // less hackers know about our stack

const port = process.env.PORT || 8080;
/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Health Check PASS");
});


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.USER, // generated mailtrap user
        pass: process.env.PASSWORD, // generated mailtrap password
    }
});
// generate email body using Mailgen
const MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Test Mail of MiniDinhMai",
        link: 'https://mailgen.js/'
    }
})
// define a route for sending emails
app.post('/send-email', (req, res) => {
    // get the recipient's email address, subject and message from the request body
    const { to, subject, message } = req.body;
    // body of the email
    const email = {
        body : {
            intro : message || 'Welcome to Test Mail of MiniDinhMai! We\'re very excited to have you on board.', 
        }
    }
    const emailBody = MailGenerator.generate(email);
    // send mail with defined transport object
    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        html: emailBody
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});
app.get('/get-email', (req, res) => {
    const email = {
        from: process.env.EMAIL,
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.message //|| '<h1>Welcome to Test Mail of MiniDinhMai!</h1><p>We\'re very excited to have you on board.</p>'
    };

    res.json(email);
});
// start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});