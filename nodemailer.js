"use strict";
const nodemailer = require("nodemailer");
const config = require('./config/config');

// async..await is not allowed in global scope, must use a wrapper
async function sendMain() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure:true,
    port: 465,
    auth: {
        user: config.config.nodeMailesGmail,
        pass: config.config.nodeApp, //  desde variable de entorno se da acceso a envio de correos automaticos
    }
});

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'fabiolin57@gmail.com', // sender address
    to: "fabio_ortega_0206@hotmail.com", // list of receivers
    subject: "Correo random de prueba con node", // Subject line
    text: "mensaje random ♥♥ ", // plain text body
    html: "<b>Este es mi SEGUNDO  correo con nodemailer ♥</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMain().catch(console.error);
