const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv))
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        demandOption: false,
        default: false
    })
    .check((argv, options) => {
        console.log('yargs', argv);
        if (isNaN (argv.b)) {
            throw 'La base tiene que ser un numero';
        }
        return true;
    })
    .parse()

const { obtenerTabla } = require('./helpers/multiplicar');
const { usarWriteFile, usarWriteFilePromise, usarWriteFilePromiseSync } = require('./helpers/archivo');

// const [, , argBase = 'base=5'] = process.argv;
// const [, base = 5] = argBase.split('=')

const numero = argv['base'] || 4;
const mostrarListado = argv['listar'];

const procesoPrincipal = async (parametro, mostrarListado = false) => {
    try {
        let tablaString = obtenerTabla(numero);
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

        return `${mostrarListado ? tablaString : ''}
        ${messageWrite}
        `;
    } catch (error) {
        throw error;
    }
}

procesoPrincipal(numero, mostrarListado)
    .then(tablaString => {
        console.log('TABLA PROCESADA');
        console.log(tablaString);
    })
    .catch(error => {
        console.log('OCURRIO UN ERROR');
        console.log(error)
    })