const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUsers = async (request, response) => {
    try{
        const users = await User.findAll();
        response.json(users);
    }catch(error){
        response.status(500).json({error: error.message});
    }
}

exports.addUser = async (request, response) => {
    try{
        const { 
            username,
            password,
            nombre_completo,
            rol_id,
            estado
        } = request.body;

        const cyptedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            password: cyptedPassword,
            nombre_completo,
            rol_id,
            estado
        });

        response.json(newUser);
    }catch(error){
        response.status(500).json({error: error.message});
    }
}