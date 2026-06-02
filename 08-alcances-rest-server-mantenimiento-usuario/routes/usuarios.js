
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
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');
// Creo objeto router para definir inyectarv las rutas a Express
const router = Router();
// Para fines educativos, uso los siguientes metodos: get, pu post, delete y patch cada uno con un contraldor distinto
// Solo la ruta en este ejemplo define una variable tipo params id
router.get('/', usuariosGet);
router.put('/:id', usuariosPut);
router.post('/', [
    check('nombre', 'El nombre es valido').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    // check('role','No es un rol permitiddo').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(async (role = '') => {
        const existeRol = await Role.findOne({ role });
        const existeRol2 = await Role.find({});
        if (!existeRol) {
            throw new Error(`El rol ${role} no esta registrado en la basse de datos.`)
        }
    }),
    validarCampos
], usuariosPost);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);
// Exponemos objeto router para ser usado desde afuera de este archivo
module.exports = router;