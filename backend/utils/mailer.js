import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const createTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.HOST_EMAIL,
      pass: process.env.HOST_PASSKEY,
    },
  });

export const SendMail = async (name, email,subject, message) => {
  const transporter = createTransporter();

  const mail1 = {
    from: process.env.HOST_EMAIL,
    to: process.env.HOST_EMAIL,
    replyTo:email,
    subject: `${subject} - ${email}`,
    text: `You have received a new message via the contact form on your website. Below are the details provided by the sender:\n\nName:- ${name}\nEmail id:- ${email}\nSubject:- "${subject}"\nMessage:-\n"${message}"\n\nPlease review the message and respond at your earliest convenience.\n\nWarm regards,\nWebsite Notification System\nIEEE Industrial Electronics Society Student Branch Chapter\nInstitute of Engineering & Management, Kolkata`,
  };

  const mail2 = {
    from: process.env.HOST_EMAIL,
    to: email,
    subject: `Thank you ${name} for Contacting IEEE IES SBC, IEM`,
    text: `Dear ${name},\n\nThank you for reaching out to the IEEE Industrial Electronics Society Student Branch Chapter at the Institute of Engineering & Management (IEEE IES SBC, IEM).\nWe have received your query and appreciate your interest in our chapter.\n\nOur team will get back to you shortly with the necessary information or support. If your query is urgent, please feel free to reach out to us directly at ieeeies.iem@gmail.com .\nWe look forward to connecting with you and hope to see you involved in our upcoming events and initiatives.\n\nWarm regards,\nTeam IEEE - IEM\n📧 ieeeies.iem@gmail.com\n🌐 https://ieee-ies-iem-sbc.vercel.app`,
  };

  try {
    const info1=await transporter.sendMail(mail1);
    console.log("Running mail 1...")
    const info2=await transporter.sendMail(mail2);
    console.log("Running mail 2.....")
    return info1;
  } catch (error) {
    console.log("Error sending mails: ", error);
  }
};

export const SendReplyMail = async (name, email, replyMessage, originalMessage,messageId) => {
  const transporter = createTransporter();

  const mail = {
    from: process.env.HOST_EMAIL,
    to: email,
    subject: `Re: Your enquiry — IEEE IES IEM Student Chapter`,
    inReplyTo: messageId,
    references: messageId,
    text: `Dear ${name},\n\n${replyMessage}\n\nWarm regards,\nIEEE IES IEM Student Branch Chapter\nInstitute of Engineering & Management, Kolkata\n📧 ieeeies.iem@gmail.com\n🌐 https://ieee-ies-iem-sbc.vercel.app`,
  };

  try
  {
    console.log("Running reply mail.....")
    await transporter.sendMail(mail);
  }
  catch(error)
  {
    console.log("Error sending reply mail: ",error)
  }
};

export default SendMail;
