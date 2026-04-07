import { IncomingForm } from 'formidable';
import { pool } from '@/utils/db';
import path from 'path';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'posts');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const form = new IncomingForm({ uploadDir, keepExtensions: true });

    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: 'Upload failed' });

        const getVal = (v) => Array.isArray(v) ? v[0] : v;
        const { title, slug, category, excerpt, content, embed_url, order, is_published } = fields;
        
        const imageFile = files.image;
        let imagePath = null;
        if (imageFile) {
            const file = Array.isArray(imageFile) ? imageFile[0] : imageFile;
            const fileData = fs.readFileSync(file.filepath);
            const base64Data = fileData.toString('base64');
            const mimeType = file.mimetype || 'image/jpeg';
            imagePath = `data:${mimeType};base64,${base64Data}`;
            // Optional: delete temp file after reading
            try { fs.unlinkSync(file.filepath); } catch(e) {}
        }

        try {
          await pool.query(
            'INSERT INTO posts (title, slug, category, excerpt, content, image, embed_url, `order`, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [getVal(title), getVal(slug), getVal(category), getVal(excerpt), getVal(content), imagePath, getVal(embed_url) || null, getVal(order) || 0, getVal(is_published) === 'true']
          );
          res.status(201).json({ message: 'Post created' });
          resolve();
        } catch (dbErr) {
          res.status(500).json({ error: dbErr.message });
          resolve();
        }
      });
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
