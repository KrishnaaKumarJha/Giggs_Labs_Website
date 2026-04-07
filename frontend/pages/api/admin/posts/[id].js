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
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
      return res.status(200).json(rows[0]);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM posts WHERE id = ?', [id]);
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'posts');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const form = new IncomingForm({ uploadDir, keepExtensions: true });

    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: 'Upload failed' });

        const getVal = (v) => Array.isArray(v) ? v[0] : v;
        
        // Handle PATCH (JSON if no files, or fields if multipart)
        // If it's a simple PATCH for is_published, it might be JSON handled elsewhere but let's be robust.
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
          // If only is_published is sent (simple PATCH)
          if (Object.keys(fields).length === 1 && fields.is_published !== undefined) {
             await pool.query('UPDATE posts SET is_published=? WHERE id=?', [getVal(is_published) === 'true' || getVal(is_published) === true ? 1 : 0, id]);
          } else {
             // Full update
             let query = 'UPDATE posts SET title=?, slug=?, category=?, excerpt=?, content=?, embed_url=?, `order`=?, is_published=?';
             let params = [getVal(title), getVal(slug), getVal(category), getVal(excerpt), getVal(content), getVal(embed_url) || null, getVal(order) || 0, getVal(is_published) === 'true'];
             
             if (imagePath) {
                 query += ', image=?';
                 params.push(imagePath);
             }
             
             query += ' WHERE id=?';
             params.push(id);
             
             await pool.query(query, params);
          }
          res.status(200).json({ message: 'Post updated' });
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
