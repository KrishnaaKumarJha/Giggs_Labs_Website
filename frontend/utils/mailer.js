import nodemailer from 'nodemailer';

/**
 * Enhanced mailer with Hostinger-optimized settings.
 * Pulls SMTP configuration from environment variables.
 */
export async function sendMail({ to, subject, text, html }) {
  // CONFIGURATION
  // In Hostinger, use 'smtp.hostinger.com' and port 465 (SSL) or 587 (TLS).
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Giggs Labs Alerts" <${process.env.SMTP_USER}>`,
    to: to || process.env.NOTIFICATION_EMAIL,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
}
