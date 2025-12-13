const { DataTypes } = require("sequelize");
const db = require("../models");
const User = db.users;
const bcrypt = require("bcryptjs");

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

        if(!username||!password||!nombre_completo||!rol_id||!estado){
            return response.status(400).json({message: "Bad Request"});
        }

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

exports.editUser = async (request, response) => {
    try{
        const { id } = request.params;
        const { 
            username,
            nombre_completo,
            rol_id,
            estado
        } = request.body;

        if(!id||!username||!password||!nombre_completo||!rol_id||!estado){
            return response.status(400).json({message: "Bad Request"});
        }

        const userEdit = await User.findByPk(id);
        if(!userEdit){
            return response.status(404).json({message: "No se encontro el usuario."});
        }

        await userEdit.update({
            username,
            nombre_completo,
            rol_id,
            actualizado_en: new Date(), 
            estado
        });

        response.json({message: "Usuario editado con exito."});
    }catch(error){
        response.status(500).json({error: error.message});
    }
}

exports.editPassword = async (request, response) => {
    try{
        const { id } = request.params;
        const { 
            password
        } = request.body;

        if(!id||!password){
            return response.status(400).json({message: "Bad Request"});
        }

        const userEdit = await User.findByPk(id);
        if(!userEdit){
            return response.status(404).json({message: "No se encontro el usuario."});
        }

        const cyptedPassword = password ? await bcrypt.hash(password, 10) : userEdit.password;
        await userEdit.update({
            password: cyptedPassword,
            actualizado_en: new Date()
        });

        response.json({message: "Contraseña editada con exito."});
    }catch(error){
        response.status(500).json({error: error.message});
    }
}

exports.deleteUser = async (request, response) => {
    try{
        const { id } = request.params;

        if(!id){
            return response.status(400).json({message: "Bad Request"});
        }

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