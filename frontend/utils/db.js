// frontend/utils/db.js
import mysql from 'mysql2/promise';

/**
 * Hostinger Shared Hosting Node.js Database Helper
 * Uses a lazy-loaded pool to ensure environment variables are ready.
 */
let poolInstance;

function createPool() {
  if (!poolInstance) {
    const config = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    };
    
    // Safety check: if user/pass are missing, log a warning
    if (!config.user || !config.password) {
       console.warn("⚠️ Database credentials missing. Check your .env.local or hPanel variables.");
    } else {
       console.log(`📡 [DB Init]: Connecting to ${config.host} as ${config.user}`);
    }
    
    poolInstance = mysql.createPool(config);
  }
  return poolInstance;
}

// Export a robust pool object that matches the usage in API routes
export const pool = {
  query: (sql, params) => createPool().query(sql, params).catch(err => {
      console.error(`❌ [DB Query Error]: ${sql}`, err.message);
      throw err;
  }),
  execute: (sql, params) => createPool().execute(sql, params).catch(err => {
      console.error(`❌ [DB Execute Error]: ${sql}`, err.message);
      throw err;
  }),
  getConnection: () => createPool().getConnection().catch(err => {
      console.error(`❌ [DB Connection Error]:`, err.message);
      throw err;
  }),
};

export default async function getDb() {
  return createPool();
}
