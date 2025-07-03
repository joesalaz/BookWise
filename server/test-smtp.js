const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendTest() {
  let transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 587,
    secure: false,
    auth: {
      user: "resend",
      pass: process.env.RESEND_API_KEY,
    },
  });

  let info = await transporter.sendMail({
    from: `"BookWise" <noreply@bookwise.joesalaz.com>`,
    to: "joesalaz.dev@gmail.com", // use your real email
    subject: "SMTP Test via Resend",
    text: "This is a test email sent using Resend SMTP and Nodemailer.",
  });

  console.log("Test email sent:", info);
}

sendTest().catch(console.error);