const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuarion = require('../models/usuario');

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;
    try {
        // Verificar si el email existe
        const usuario = await Usuarion.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo'
            })
        }
        // Si el usuario estaa activo
        if (!usuario.status) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - status = false'
            })
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password'
            })
        }


        // Generar el JWT



        res.json({
            msg: 'Login OK'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    login
};