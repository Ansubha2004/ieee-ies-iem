import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();



const SendMail = async (name, email, message) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.HOST_EMAIL,
            pass: process.env.HOST_PASSKEY
        }
    })

    const mail1 = {
        from :process.env.HOST_EMAIL,
        to:process.env.HOST_EMAIL,
        subject: `Notification from ${name} - ${email}`,
        text: `You have received a new message via the contact form on your website. Below are the details provided by the sender:\n\n-Name:- ${name}\n-Email id:- ${email}\n\nMessage:-\n"${message}"\n\nPlease review the message and respond at your earliest convenience.\n\nWarm regards,\nWebsite Notification System\nIEEE Industrial Electronics Society Student Branch Chapter\nInstitute of Engineering & Management, Kolkata`
    }

    const mail2 = {
        from: process.env.HOST_EMAIL,
        to: email,
        subject: `Thank you ${name} for Contacting IEEE IES SBC, IEM`,
        text: `Dear ${name},\n\nThank you for reaching out to the IEEE Industrial Electronics Society Student Branch Chapter at the Institute of Engineering & Management (IEEE IES SBC, IEM).\nWe have received your query and appreciate your interest in our chapter.\n\nOur team will get back to you shortly with the necessary information or support. If your query is urgent, please feel free to reach out to us directly at ieeeies.iem@gmail.com .\nWe look forward to connecting with you and hope to see you involved in our upcoming events and initiatives.\n\nWarm regards,\nTean IEEE - IEM\n📧 ieeeies.iem@gmail.com\n🌐 https://ieee-ies-iem-sbc.vercel.app`
    }

   try{
     const info1=await transporter.sendMail(mail1);
     console.log("Mail 1 sent successfully.....");
     const info2=await transporter.sendMail(mail2);
     console.log("Mail 2 sent successfully.....");
   }
   catch(error)
   {
     console.log("Error sending mails: ",error);
   }


}

export default SendMail;