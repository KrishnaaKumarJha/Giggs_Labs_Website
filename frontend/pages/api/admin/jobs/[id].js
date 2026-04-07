import { pool } from '@/utils/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Job not found' });
      res.status(200).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'PUT') {
    const { title, department, location, type, description, is_active } = req.body;
    try {
      await pool.query(
        'UPDATE jobs SET title=?, department=?, location=?, type=?, description=?, is_active=? WHERE id=?',
        [title, department, location, type, description, is_active ? 1 : 0, id]
      );
      res.status(200).json({ id, ...req.body });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM jobs WHERE id = ?', [id]);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
