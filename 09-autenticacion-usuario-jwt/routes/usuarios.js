
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
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validator');
// Creo objeto router para definir inyectarv las rutas a Express
const router = Router();
// Para fines educativos, uso los siguientes metodos: get, pu post, delete y patch cada uno con un contraldor distinto
// Solo la ruta en este ejemplo define una variable tipo params id
router.get('/', usuariosGet);
router.put('/:id', [
    check('id', 'No es un id valido.').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRolValido),
    validarCampos,
], usuariosPut);
router.post('/', [
    check('nombre', 'El nombre es valido').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    // check('role','No es un rol permitiddo').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(esRolValido),
    check('correo').custom(existeEmail),
    validarCampos
], usuariosPost);
router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    // esAdminRole,
    check('id', 'No es un id valido.').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);
router.patch('/', usuariosPatch);
// Exponemos objeto router para ser usado desde afuera de este archivo
module.exports = router;