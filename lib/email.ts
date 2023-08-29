import nodemailer from "nodemailer";
import { getErrorMessage } from "./exceptions/errors";

export async function sendEmail(data: { from: string, to: string, subject: string, html: string }) {
  try {
    // Setup node mailer to send email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: parseInt(process.env.SMTP_PORT!),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
   
    });

    const mailOptions = {
      from: data.from,
      to: data.to,
      subject: data.subject,
      html: data.html,
      Headers: [
        {
          // Set this to prevent Gmail from threading emails.
          // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
          Name: "X-Entity-Ref-ID",
          Value: new Date().getTime() + "",
        },
      ],
    };
    transporter.verify((err, success) => {
      if (err) console.error(err);
      
  });

    await transporter.sendMail(mailOptions);

  } catch (error) {
    console.log(error)
    return {
      error: getErrorMessage(error),
    }
  }
}