const express = require('express');
const router = express.Router();
const { pool } = require('../db');  

//http://localhost:3001/api/tours?limit=10&offset=0
router.get('/tours', async (req, res) => {
  const limit = parseInt(req.query.limit);
  const offset = parseInt(req.query.offset);
  const sql = 'SELECT * FROM tourApp.tour LIMIT $1 OFFSET $2;';
  try {
    const result = await pool.query(sql, [limit, offset]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching rastaurants:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//http://localhost:3001/api/tours/availability
router.get('/tours/availability', async (req, res) => {
  const sql='SELECT * FROM tourApp.tour_schedules where NOW()<=schedule_time and reserved=false;';
  try{
    const result=await pool.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching available rastaurants:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//http://localhost:3001/api/tours/reserve?personName='Bryan'&tourId=1&scheduleTime='2023-06-20 8:00:00'
router.put('/tours/reserve', async (req, res) => {
  const personName = req.query.personName;
  const scheduleTime = req.query.scheduleTime;
  const tourId = parseInt(req.query.tourId);
  const sql = 'UPDATE tourApp.tour_schedules SET reserved = true, reservedBy=$1 WHERE tour_id=$2 AND schedule_time = $3;';
  try {
    const result = await pool.query(sql, [personName, tourId, scheduleTime]);
    res.json("It was updated.");
  } catch (err) {
    console.error('Error updating rastaurant availability:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
