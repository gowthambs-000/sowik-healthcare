// Send OTP email through Resend's HTTPS API. This works on hosts that block SMTP.
export const sendOtpEmail = async (to, otp) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || process.env.MAIL_FROM;

  if (!apiKey) throw new Error('Email is not configured on the server (RESEND_API_KEY missing)');
  if (!from) throw new Error('Email is not configured on the server (EMAIL_FROM missing)');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: 'Your Sowik admin password reset code',
      text: `Your password reset code is ${otp}. It expires in 10 minutes. If you did not ask for this, ignore this email.`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px">
          <h2 style="margin:0 0 12px">Sowik Home Health Care</h2>
          <p>Use this code to reset your admin password:</p>
          <p style="font-size:32px;font-weight:bold;letter-spacing:6px;margin:16px 0">${otp}</p>
          <p style="color:#555">It expires in 10 minutes. If you did not ask for this, you can ignore this email.</p>
        </div>`
    })
  });

  if (!response.ok) {
    const details = await response.text();
    console.error('Resend email request failed:', response.status, details);
    throw new Error(`Email provider request failed (${response.status})`);
  }

  const result = await response.json();
  console.log('Reset email sent:', result.id);
};
