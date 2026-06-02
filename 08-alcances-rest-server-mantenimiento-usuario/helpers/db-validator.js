const Role = require('../models/role');

const esRolValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    const existeRol2 = await Role.find({});
    if (!existeRol) {
        throw new Error(`El rol ${role} no esta registrado en la basse de datos.`)
    }
}

module.exports = {
    esRolValido,
}