import { pool } from '@/utils/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const [[jobs]] = await pool.query('SELECT COUNT(*) as count FROM jobs');
    const [[posts]] = await pool.query('SELECT COUNT(*) as count FROM posts');
    const [[services]] = await pool.query('SELECT COUNT(*) as count FROM services');
    const [[apps]] = await pool.query('SELECT COUNT(*) as count FROM applications').catch(() => [[{count: 0}]]);
    const [[msgs]] = await pool.query('SELECT COUNT(*) as count FROM contact_messages').catch(() => [[{count: 0}]]);

    return res.status(200).json({
      jobs: jobs.count,
      posts: posts.count,
      services: services.count,
      applications: apps.count,
      messages: msgs.count,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
}
