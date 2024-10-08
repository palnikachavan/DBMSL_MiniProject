
const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you're using a db config for MySQL

// Route to get adoption history
router.get('/history', async (req, res) => {
  try {
    const [results] = await db.query("SELECT a.first_name, a.last_name, a.phone, a.email, a.address, a.city, a.state, a.zip_code, a.preferred_species, a.adoption_history FROM Adopters a WHERE a.status=1");
    res.json(results);
  } catch (error) {
    console.error('Error fetching adoption history:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const [pets] = await db.query('SELECT * FROM Pets WHERE is_adopted=0');
//     res.json(pets);
//   } catch (error) {
//     console.error('Error fetching pets:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


module.exports = router;

// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// // Fetch all adopters
// router.get('/', async (req, res) => {
//   try {
//     const [adopters] = await db.query('SELECT * FROM Adopters');
//     res.json(adopters);
//   } catch (error) {
//     console.error('Error fetching adopters:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Fetch adopter by ID
// router.get('/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [adopter] = await db.query('SELECT * FROM Adopters WHERE adopter_id = ?', [id]);

//     if (adopter.length === 0) {
//       return res.status(404).json({ message: 'Adopter not found' });
//     }

//     res.json(adopter[0]);
//   } catch (error) {
//     console.error('Error fetching adopter details:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;
