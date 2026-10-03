import nodemailer from 'nodemailer';

let transporter;

const getTransporter = () => {
  if (!process.env.SMTP_HOST) return null;
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
  }
  return transporter;
};

export const sendOtpEmail = async (to, otp) => {
  const t = getTransporter();

  // No email settings yet: in development, print the code in the server terminal
  if (!t) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Email is not configured on the server');
    }
    console.log(`\n[DEV ONLY] Password reset code for ${to}: ${otp}\n`);
    return;
  }

  await t.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to,
    subject: 'Your Sowik admin password reset code',
    text: `Your password reset code is ${otp}. It expires in 10 minutes. If you did not ask for this, ignore this email.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px">
        <h2 style="margin:0 0 12px">Sowik Home Health Care</h2>
        <p>Use this code to reset your admin password:</p>
        <p style="font-size:32px;font-weight:bold;letter-spacing:6px;margin:16px 0">${otp}</p>
        <p style="color:#555">It expires in 10 minutes. If you did not ask for this, you can ignore this email.</p>
      </div>`
  });
};