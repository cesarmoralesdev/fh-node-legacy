const fsPromise = require('node:fs/promises');
const fs = require('node:fs');
const { error } = require('node:console');

const obtenerTabla = async (multiplicando) => {
    return new Promise((resolve, reject) => {
        try {
            console.clear();
            console.log("=====================================");
            console.log(`Tabla del ${multiplicando}`);
            console.log("=====================================");
            let multiplicadorLimite = 10;
            let salida = '';
            for (let index = 1; index <= multiplicadorLimite; index++)
                salida += `${multiplicando} X ${index} = ${multiplicando * index}\n`;
            resolve(salida);
        } catch (error) {
            reject('Ocurrio un error al proceso la tabla')
        }
    })
}

const usarWriteFile = async (nameFile, dataFile) => {
    return new Promise((resolve, reject) => {
        try {
            const data = new Uint8Array(Buffer.from(dataFile));
            fs.writeFile(nameFile, data, (err) => {
                if (err) reject(err);
                resolve(`El archivo ${nameFile} ha sido guardado satisfactoriamente!`);
            });
        } catch (error) {
            reject(error);
        }
    })
}

const usarWriteFilePromise = async (nameFile, dataFile, signal) => {
    try {
        const data = new Uint8Array(Buffer.from(dataFile));
        await fsPromise.writeFile(nameFile, data, { signal });
        return `El archivo ${nameFile} ha sido guardado satisfactoriamente!`;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Operación cancelada por el controlador externo.');
        }
        throw error; 
    }
}

let parametro = 5;

const procesoPrincipal = async (numero) => {
    try {
        let tablaString = await obtenerTabla(numero);
        // *******************************************************************************************
        // Usando funcion con callback
        // *******************************************************************************************
        // let messageWrite = await usarWriteFile(`tabla-${parametro}.txt`, tablaString);
        // *******************************************************************************************

        // *******************************************************************************************
        // Usando funcion con Promise
        // *******************************************************************************************
        const controller = new AbortController();
        // Ejemplo práctico: Cancelar la escritura si tarda más de 50 milisegundos
        setTimeout(() => {
            controller.abort();
        }, 50);
        let messageWrite = await usarWriteFilePromise(`tabla-${parametro}.txt`, tablaString, controller.signal);
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