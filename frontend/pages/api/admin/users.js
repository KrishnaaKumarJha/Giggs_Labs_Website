import { pool } from '@/utils/db';

export default async function handler(req, res) {
  // In our simplified monolith, we only have one admin user for now.
  // We can return a mock list or check the db if there's a users table.
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // For now, let's return the default admin user since we don't have a users table yet
    const users = [
      { id: 1, username: process.env.ADMIN_USER || 'admin', email: 'admin@giggs.com', is_active: true }
    ];
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
}
