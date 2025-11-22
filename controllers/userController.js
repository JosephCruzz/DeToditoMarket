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
            id,
            username,
            password,
            nombre_completo,
            rol_id,
            estado
        } = request.body;

        const cyptedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            id,
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

exports.editUser = async (request, response) => {
    try{
        const { id } = request.params;
        const { 
            username,
            password,
            nombre_completo,
            rol_id,
            actualizado_en, 
            estado
        } = request.body;

        const userEdit = await User.findByPk(id);
        if(!userEdit){
            return response.status(404).json({message: "No se encontro el usuario."});
        }

        const cyptedPassword = password ? await bcrypt.hash(password, 10) : userEdit.password;
        await userEdit.update({
            username,
            password: cyptedPassword,
            nombre_completo,
            rol_id,
            actualizado_en, 
            estado
        });

        response.json({message: "Usuario editado con exito."});
    }catch(error){
        response.status(500).json({error: error.message});
    }
}

exports.deleteUser = async (request, response) => {
    try{
        const { id } = request.params;

        const userDelete = await User.findByPk(id);
        if(!userDelete){
            return response.status(404).json({message: "No se encontro el usuario."});
        }

        await userDelete.destroy();

        response.json({message: "Usuario eliminado con exito."});
    }catch(error){
        response.status(500).json({error: error.message});
    }
}