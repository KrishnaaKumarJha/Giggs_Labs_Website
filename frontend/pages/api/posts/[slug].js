import { pool } from '@/utils/db';

export default async function handler(req, res) {
  const { slug } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM posts WHERE slug = ? AND is_published = 1',
      [slug]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Post Detail API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
