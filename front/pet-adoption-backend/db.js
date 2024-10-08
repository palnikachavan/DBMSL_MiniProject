const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',     // Ensure this is set correctly
  user: process.env.DB_USER || 'root',          // Your MySQL username
  password: process.env.DB_PASSWORD || 'your_password',  // Your MySQL password
  database: process.env.DB_NAME || 'pet_adoption_db',   // Your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection (optional but useful for debugging)
db.getConnection()
  .then(connection => {
    console.log('Database connection successful!');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
  });

module.exports = db;
