// Send OTP email through Brevo's HTTPS API (port 443; no SMTP connection needed).
export const sendOtpEmail = async (to, otp) => {
  const apiKey = process.env.BREVO_API_KEY;
  const fromValue = process.env.EMAIL_FROM || process.env.MAIL_FROM;

  if (!apiKey) throw new Error('Email is not configured on the server (BREVO_API_KEY missing)');
  if (!fromValue) throw new Error('Email is not configured on the server (EMAIL_FROM missing)');

  // Accept either "Sowik Admin <noreply@sowik.in>" or just "noreply@sowik.in".
  const match = fromValue.match(/^\s*(.*?)\s*<([^<>]+)>\s*$/);
  const sender = match
    ? { name: match[1] || 'Sowik Home Health Care', email: match[2].trim() }
    : { name: 'Sowik Home Health Care', email: fromValue.trim() };

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      accept: 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      sender,
      to: [{ email: to }],
      subject: 'Your Sowik admin password reset code',
      textContent: `Your password reset code is ${otp}. It expires in 10 minutes. If you did not ask for this, ignore this email.`,
      htmlContent: `
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
    console.error('Brevo email request failed:', response.status, details);
    throw new Error(`Email provider request failed (${response.status})`);
  }

  const result = await response.json();
  console.log('Reset email accepted by Brevo:', result.messageId);
};
