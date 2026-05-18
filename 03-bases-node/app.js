const fsPromise = require('node:fs/promises');
const fs = require('node:fs');
const { error } = require('node:console');

const obtenerTabla = (multiplicando) => {
    console.clear();
    console.log("=====================================");
    console.log(`Tabla del ${multiplicando}`);
    console.log("=====================================");
    let multiplicadorLimite = 10;
    let salida = '';
    for (let index = 1; index <= multiplicadorLimite; index++)
        salida += `${multiplicando} X ${index} = ${multiplicando * index}\n`;
    return salida;
}

const usarWriteFile = async (nameFile, dataFile = '') => {
    return new Promise((resolve, reject) => {
        const data = new Uint8Array(Buffer.from(dataFile));
        fs.writeFile(nameFile, data, (err) => {
            if (err) return reject(err);
            resolve(`El archivo ${nameFile} ha sido guardado satisfactoriamente!`);
        });
    })
}

const usarWriteFilePromise = async (nameFile, dataFile, signal) => {
    const data = new Uint8Array(Buffer.from(dataFile));
    await fsPromise.writeFile(nameFile, data, { signal });
    return `El archivo ${nameFile} ha sido guardado satisfactoriamente!`;
}

let parametro = 5;

const procesoPrincipal = async (numero) => {
    try {
        let tablaString = obtenerTabla(numero);
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
        setTimeout(() => controller.abort(), 50);
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