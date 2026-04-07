import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { pool } from '@/utils/db';
import { sendMail } from '../../utils/mailer';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'cvs');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'File upload failed' });

    // Handle formidable fields (sometimes they are arrays)
    const getVal = (v) => Array.isArray(v) ? v[0] : v;
    const name = getVal(fields.name);
    const email = getVal(fields.email);
    const phone = getVal(fields.phone);
    const qualification = getVal(fields.qualification);
    const age = getVal(fields.age);
    const address = getVal(fields.address);
    const job_title = getVal(fields.job_title) || 'Unknown Position';
    const jobId = getVal(fields.jobId);
    const experience = getVal(fields.experience);
    const current_ctc = getVal(fields.current_ctc);
    const expected_ctc = getVal(fields.expected_ctc);
    const linkedin = getVal(fields.linkedin);
    const portfolio = getVal(fields.portfolio);
    const message = getVal(fields.message);

    const cvFile = files.cv;
    const cvPath = Array.isArray(cvFile) ? cvFile[0].newFilename : cvFile?.newFilename;
    const finalPath = cvPath ? `/uploads/cvs/${cvPath}` : null;

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    try {
      await pool.query(
        `INSERT INTO applications (
          job_id, name, email, phone, qualification, age, address, 
          experience_summary, current_ctc, expected_ctc, 
          linkedin_url, portfolio_url, message, cv_path
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          jobId || null, name, email, phone, qualification || null, age || null, address || null, 
          experience || null, current_ctc || null, expected_ctc || null, 
          linkedin || null, portfolio || null, message || null, finalPath
        ]
      );

      // Trigger Email Alert
      await sendMail({
        subject: `New Application: ${name} for ${job_title}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #f8fafc; color: #1e293b; max-width: 600px; margin: auto;">
            <div style="text-align: center; margin-bottom: 25px;">
              <h1 style="color: #4f46e5; margin: 0; font-size: 24px;">New Job Application</h1>
              <p style="color: #64748b; margin-top: 5px;">A new candidate has applied for <strong>${job_title}</strong></p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
              <h2 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; font-size: 18px; color: #334155;">Candidate Details</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 40%;">Full Name:</td><td style="padding: 8px 0;">${name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0; color: #2563eb;">${email}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${phone}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Age:</td><td style="padding: 8px 0;">${age || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Qualification:</td><td style="padding: 8px 0;">${qualification || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Experience:</td><td style="padding: 8px 0;">${experience || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Current CTC:</td><td style="padding: 8px 0;">${current_ctc || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Expected CTC:</td><td style="padding: 8px 0;">${expected_ctc || 'N/A'}</td></tr>
              </table>
              
              <h2 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-top: 25px; font-size: 18px; color: #334155;">Links & Message</h2>
              <div style="margin-top: 15px;">
                <p><strong>LinkedIn:</strong> ${linkedin ? `<a href="${linkedin}" style="color: #2563eb;">View Profile</a>` : 'N/A'}</p>
                <p><strong>Portfolio:</strong> ${portfolio ? `<a href="${portfolio}" style="color: #2563eb;">View Portfolio</a>` : 'N/A'}</p>
                <p><strong>Message:</strong><br><span style="color: #475569; display: block; margin-top: 5px; background: #f1f5f9; padding: 10px; border-radius: 8px;">${message || 'No additional message'}</span></p>
                 <p><strong>Address:</strong><br><span style="color: #475569; display: block; margin-top: 5px;">${address || 'N/A'}</span></p>
              </div>
              
              <div style="margin-top: 30px; text-align: center;">
                ${finalPath ? `
                  <a href="${baseUrl}${finalPath}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Download Resume (PDF)</a>
                ` : '<p style="color: #ef4444; font-weight: bold;">No CV Uploaded</p>'}
              </div>
            </div>
            
            <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px;">
              This notification was generated by the Giggs Labs Admin System.
            </p>
          </div>
        `
      }).catch(e => console.error("Email send failed:", e));

      return res.status(201).json({ message: 'Application submitted successfully' });
    } catch (dbErr) {
      console.error(dbErr);
      return res.status(500).json({ error: dbErr.message });
    }
  });
}
