const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`El rol ${role} no esta registrado en la basse de datos.`)
    }
}

const existeEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya esta registrado.`);
    }
}

module.exports = {
    esRolValido,
    existeEmail,
}