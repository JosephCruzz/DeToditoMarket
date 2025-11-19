const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } 
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        
        const userResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
            isActive: user.isActive
        };
        
        res.status(201).json({ user: userResponse, message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
        
        const userResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
            isActive: user.isActive
        };
        
        res.json({ user: userResponse, token, message: 'Login exitoso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;