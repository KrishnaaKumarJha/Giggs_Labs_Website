import { pool } from '@/utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    const { title, department, location, type, description, is_active } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO jobs (title, department, location, type, description, is_active) VALUES (?, ?, ?, ?, ?, ?)',
        [title, department, location, type, description, is_active ? 1 : 0]
      );
      res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
