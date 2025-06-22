const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Prueba
router.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Registro de usuario
router.post('/register', async (req, res) => {
    res.json({ message: 'User registration endpoint' });
});

// Login
router.post('/login', async (req, res) => {
    res.json({ message: 'User login endpoint' });
});

module.exports = router;