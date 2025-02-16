import { readFile } from 'fs/promises';
import nodemailer from 'nodemailer';

import 'dotenv/config';
import { formatString } from './string';

import type { Logo } from '../types/database';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

class EmailService {
  private static transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  } as SMTPTransport.Options);

  static async sendEmail(mailOptions: SMTPTransport.MailOptions) {
    return this.transporter.sendMail(mailOptions);
  }

  static async sendSubmissionEmail(logoData: Logo) {
    const html = await readFile('./templates/test.html', 'utf-8');

    const formattedHtml = formatString(html, {
      name: logoData.author
    });

    const mailOptions: SMTPTransport.MailOptions = {
      from: process.env.EMAIL_USER,
      to: logoData.email,
      subject: 'Logo Submission Confirmation',

      html: formattedHtml
    };

    return this.sendEmail(mailOptions);
  }
}


export { EmailService };
