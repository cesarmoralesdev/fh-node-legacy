// Usamos estos objetos para darle un especie de tipado en mis controladores
const { response, request } = require('express');
// req = request, res = response permite dar un tipado y que el IDE permita autocompletar
const usuariosGet = (req = request, res = response) => {
    // Parametros query
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    // Respuesta json
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}
// Los demas son ejemplo simples
const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'post API - usuariosPost',
        nombre,
        edad
    });
}
// Usa el id que esta en params de la ruta
const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'put API - usuariosPut',
        id
    });
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