import nodemailer from 'nodemailer';
import 'dotenv/config';

import type SMTPTransport from 'nodemailer/lib/smtp-transport';

class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  } as SMTPTransport.Options);

  async sendEmail(mailOptions: SMTPTransport.MailOptions) {
    return this.transporter.sendMail(mailOptions);
  }
}

export { EmailService };
