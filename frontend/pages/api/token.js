export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'API is online', env_check: !!process.env.ADMIN_USER });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!req.body || typeof req.body !== 'object') {
      console.error("DEBUG: Request body is missing or NOT an object.");
      return res.status(400).json({ error: 'Missing request body' });
  }

  let { username, password } = req.body;
  username = username?.toString().trim();
  password = password?.toString().trim();

  // Simple authentication - Hostinger might escape $ as \$ in some interfaces
  let ADMIN_USER = (process.env.ADMIN_USER || 'admin').trim();
  let ADMIN_PASS = (process.env.ADMIN_PASS || 'Giggs@12345$').replace(/\\\$/g, '$').trim();

  // Log password match details securely (masking characters)
  const passMatch = (password === ADMIN_PASS);
  console.log(`DEBUG: Password match: ${passMatch}`);
  if (!passMatch) {
      console.log(`DEBUG: Received password length: ${password?.length}`);
      console.log(`DEBUG: Expected password length: ${ADMIN_PASS?.length || 0}`);
      
      // Log hex codes of the expected password to find the ghost character
      if (ADMIN_PASS) {
          const hex = Array.from(ADMIN_PASS).map(c => c.charCodeAt(0).toString(16)).join(' ');
          console.log(`DEBUG: Expected password HEX: ${hex}`);
      }
  }

  const userMatch = (username === ADMIN_USER);
  console.log(`DEBUG: Username match: ${userMatch}`);
  
  if (userMatch && passMatch) {
    // Return a simple token (in a real app, use JWT)
    console.log("Login successful!");
    return res.status(200).json({ 
        access: 'mock-jwt-token-for-hostinger',
        refresh: 'mock-refresh-token'
    });
  } else {
    console.warn(`Invalid login for ${username}.`);
    return res.status(401).json({ error: 'Invalid credentials' });
  }
}
