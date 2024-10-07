const express = require('express');
const router = express.Router();
const db = require('../db');

// Adopt a pet
router.post('/:petId', (req, res) => {
  const petId = req.params.petId;
  const { first_name, last_name, phone, email, address } = req.body;
  
  // Transaction: Insert adopter and update pet status
  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ error: err });

    const insertAdopter = 'INSERT INTO Adopters (first_name, last_name, phone, email, address) VALUES (?, ?, ?, ?, ?)';
    db.query(insertAdopter, [first_name, last_name, phone, email, address], (err, adopterResult) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ error: err });
        });
      }

      const adopterId = adopterResult.insertId;
      const updatePet = 'UPDATE Pets SET is_adopted = 1 WHERE pet_id = ?';
      db.query(updatePet, [petId], (err) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ error: err });
          });
        }

        const insertAdoption = 'INSERT INTO Adoptions (pet_id, adopter_id, adoption_date) VALUES (?, ?, CURDATE())';
        db.query(insertAdoption, [petId, adopterId], (err) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: err });
            });
          }

          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({ error: err });
              });
            }
            res.status(201).json({ message: 'Adoption successful' });
          });
        });
      });
    });
  });
});

module.exports = router;
