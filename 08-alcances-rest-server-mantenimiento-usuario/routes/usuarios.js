
// Uso la funcion router para definir mis rutas de usuario
const { Router } = require('express');
// Llamo a los controladores de usuario, que almacenan la logica del negocio
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios');
const { check } = require('express-validator');
// Creo objeto router para definir inyectarv las rutas a Express
const router = Router();
// Para fines educativos, uso los siguientes metodos: get, pu post, delete y patch cada uno con un contraldor distinto
// Solo la ruta en este ejemplo define una variable tipo params id
router.get('/', usuariosGet);
router.put('/:id', usuariosPut);
router.post('/', [
    check('correo','El correo no es valido').isEmail()
],usuariosPost);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);
// Exponemos objeto router para ser usado desde afuera de este archivo
module.exports = router;