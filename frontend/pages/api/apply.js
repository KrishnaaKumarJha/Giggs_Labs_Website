// Note: In Next.js Pages Router, API routes handle requests server-side.
// This mock just logs the fields and returns OK.

export const config = {
  api: {
    bodyParser: false, // we will parse multipart manually (or ignore) in dev mock
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // For a development mock, we don't parse the file fully.
  // Instead just acknowledge receipt so the frontend can behave correctly.

  console.log('Received job application (multipart). Headers:', req.headers['content-type']);
  // For real backend: parse multipart (e.g. with multer or busboy) and save the file.

  return res.status(200).json({ status: 'ok' });
}
