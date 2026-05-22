const { obtenerTabla } = require('./helpers/multiplicar');
const { usarWriteFile, usarWriteFilePromise, usarWriteFilePromiseSync } = require('./helpers/archivo');
const argv = require('./config/yargs');
const numero = argv['base'] || 4;
const limite = argv['hasta'] || 10;
const mostrarListado = argv['listar'] || false;

const procesoPrincipal = async (parametro, limite, mostrarListado) => {
    try {
        let { salida: tablaString, salidaColores } = obtenerTabla(numero, limite);
        // *******************************************************************************************
        // Forma 1: Usando funcion con callback
        // *******************************************************************************************
        // let messageWrite = await usarWriteFile(`tabla-${parametro}.txt`, tablaString);
        // *******************************************************************************************

        // *******************************************************************************************
        // Forma 2: Usando funcion con Promise
        // *******************************************************************************************
        // const controller = new AbortController();
        // // Ejemplo práctico: Cancelar la escritura si tarda más de 50 milisegundos
        // setTimeout(() => controller.abort(), 50);
        // let messageWrite = await usarWriteFilePromise(`tabla-${parametro}.txt`, tablaString, controller.signal);
        // *******************************************************************************************

        // *******************************************************************************************
        // Forma 2: Usando funcion sincrona
        // *******************************************************************************************
        let messageWrite = await usarWriteFilePromiseSync(`tabla-${parametro}.txt`, tablaString);
        // *******************************************************************************************

        return `${mostrarListado ? salidaColores : ''}
        ${messageWrite}
        `;
    } catch (error) {
        throw error;
    }
}

procesoPrincipal(numero, limite, mostrarListado)
    .then(tablaString => {
        console.log('TABLA PROCESADA');
        console.log(tablaString);
    })
    .catch(error => {
        console.log('OCURRIO UN ERROR');
        console.log(error)
    })