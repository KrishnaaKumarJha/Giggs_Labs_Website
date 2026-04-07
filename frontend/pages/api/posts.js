import { pool } from '@/utils/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM posts WHERE is_published = 1 ORDER BY created_at DESC'
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Posts API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
