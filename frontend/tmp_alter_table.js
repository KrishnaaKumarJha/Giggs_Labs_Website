const mysql = require('mysql2/promise');
const fs = require('fs');

async function run() {
    const config = {
        host: '127.0.0.1',
        user: 'u328651628_giggs_db1',
        password: 'Giggs@12345$',
        database: 'u328651628_giggs_db1'
    };

    const conn = await mysql.createConnection(config);
    try {
        const sql = `ALTER TABLE applications 
            ADD COLUMN IF NOT EXISTS qualification VARCHAR(200) AFTER phone, 
            ADD COLUMN IF NOT EXISTS age INT AFTER qualification, 
            ADD COLUMN IF NOT EXISTS address TEXT AFTER age, 
            ADD COLUMN IF NOT EXISTS current_ctc VARCHAR(100) AFTER experience_summary, 
            ADD COLUMN IF NOT EXISTS expected_ctc VARCHAR(100) AFTER current_ctc, 
            ADD COLUMN IF NOT EXISTS message TEXT AFTER expected_ctc;`;
        
        console.log('Running SQL...');
        await conn.query(sql);
        console.log('SUCCESS: Table Altered');
    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await conn.end();
    }
}

run();
