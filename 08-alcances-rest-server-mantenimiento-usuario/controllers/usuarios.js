// Usamos estos objetos para darle un especie de tipado en mis controladores
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
// req = request, res = response permite dar un tipado y que el IDE permita autocompletar
const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };
    // Usamos Promise.all porque ambas promesas no dependen una de la otra. En caso dependienran deberiamos almacenarlas en variables distintas y usar un await en cada variable.
    // Con el Promise.all, si antes cada promesa tardaba un segundo y en total demoraria 2, con el Promise.all demoraria solo 1 segundo es decir la mitad.
    // Esta forma replicarla en promesa cuyo resultado no dependan entre si
    //[ total, usuarios ] deseestructuramos los resultados, segun la posicion de la promesa se alamcenara en la variable correspodiente
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
                            .skip(Number(desde))
                            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
}
// Los demas son ejemplo simples
const usuariosPost = async (req, res = response) => {
    const body = req.body;
    const usuario = new Usuario(body);
    // Encriptar la contraseña
    // Dependiendo el parametro de la funcion la clave puede ser mas seguro si el numero mas alto, pero demora mas en generarse
    // Se recomienda buscar un equilibrio entre seguridad y rendimiento
    const saltosParaGenerarClave = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(body.password, saltosParaGenerarClave);

    // Guardar en DB
    await usuario.save();
    res.json(usuario);
}
// Usa el id que esta en params de la ruta
const usuariosPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    // TODO: Validar contra base de datos
    if (password) {
        // Encriptar contraseña
        const saltosParaGenerarClave = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, saltosParaGenerarClave);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}