const { obtenerTabla } = require('./helpers/multiplicar');
const { usarWriteFile, usarWriteFilePromise, usarWriteFilePromiseSync } = require('./helpers/archivo');

let parametro = 5;

const procesoPrincipal = async (numero) => {
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
        
        return `${tablaString}
        ${messageWrite}
        `;
    } catch (error) {
        throw error;
    }
}

procesoPrincipal(parametro)
    .then(tablaString => {
        console.log('TABLA PROCESADA');
        console.log(tablaString);
    })
    .catch(error => {
        console.log('OCURRIO UN ERROR');
        console.log(error)
    })