const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Received contact form submission:', name, email, message);

  const msg = {
    to: process.env.RECIPIENT_EMAIL,
    from: process.env.SENDER_EMAIL,
    subject: `New message from ${name}`,
    text: `You have received a new message from ${name} (${email}): ${message}`,
    html: `<strong>You have received a new message from ${name} (${email}):</strong><p>${message}</p>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent successfully');
      // Redirect to the contact page with a success query parameter
      res.redirect('/contact?message=success');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      console.error(`Error details: ${error.message}\n${error.stack}`);
      // Redirect back to the contact form in case of error and log the error
      res.redirect('/contact?message=error');
    });
});

module.exports = router;