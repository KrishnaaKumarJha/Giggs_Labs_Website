import { pool } from '@/utils/db';
import { sendMail } from '../../utils/mailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, subject, message, company } = req.body;
    try {
      await pool.query(
        'INSERT INTO contact_messages (name, email, subject, message, company) VALUES (?, ?, ?, ?, ?)',
        [name, email, subject || 'No Subject', message, company || null]
      );

      // Trigger Email Alert
      await sendMail({
        subject: `New Lead: ${name} [${company || 'Personal'}]`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #00E0FF;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</div>
            <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">
            <small>To change the recipient of these alerts, edit the <strong>NOTIFICATION_EMAIL</strong> in your Hostinger hPanel.</small>
          </div>
        `
      }).catch(e => console.error("Email send failed:", e));

      return res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    // Admin view
    try {
      const [rows] = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await pool.query('DELETE FROM contact_messages WHERE id = ?', [id]);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
