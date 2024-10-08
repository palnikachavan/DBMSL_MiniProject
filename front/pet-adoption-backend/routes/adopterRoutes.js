const express = require('express');
const router = express.Router();
const db = require('../db');  // Ensure your DB connection here

router.get('/history', async (req, res) => {
  try {
      const [adopters] = await db.query("SELECT * FROM Adopters where adoption_history!='None'");
      res.json(adopters);
  } catch (error) {
      console.error('Error fetching adopters:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
