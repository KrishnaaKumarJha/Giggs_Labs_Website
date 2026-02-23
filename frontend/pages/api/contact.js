export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: "Missing fields" });
  console.log("Contact submission:", { name, email, message, at: new Date().toISOString() });
  return res.status(200).json({ status: "ok" });
}
