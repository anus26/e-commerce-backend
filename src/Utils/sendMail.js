
import dotenv from 'dotenv'
dotenv.config()
import nodemailer from "nodemailer";

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Not Loaded ❌");




const transporter = nodemailer.createTransport({
  service: "gmail", // or smtp
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    // user:authmiddleware
  },
});

export const sendMail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
       from: `"Ecommerce App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log("✅ Email sent successfully!");
  } catch (error) {
    console.error("❌ Error while sending mail", error);
  }
};
