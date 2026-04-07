import { pool } from '@/utils/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const [rows] = await pool.query('SELECT * FROM contact_messages ORDER BY id DESC');
    return res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    return res.status(200).json([]); // Suppress error for UI for now
  }
}
