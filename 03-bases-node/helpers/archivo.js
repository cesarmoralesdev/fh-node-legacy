const fs = require('node:fs');
const fsPromise = require('node:fs/promises');
//No bloquea el hilo principal, solo bloquea la peticion de un usuario, si fuera una peticion web
const usarWriteFile = async (nameFile, dataFile = '') => {
    return new Promise((resolve, reject) => {
        const data = new Uint8Array(Buffer.from(dataFile));
        fs.writeFile(nameFile, data, (err) => {
            if (err) return reject(err);
            resolve(`El archivo ${nameFile} ha sido guardado satisfactoriamente!`);
        });
    })
}
//No bloquea el hilo principal, solo bloquea la peticion de un usuario, si fuera una peticion web
const usarWriteFilePromise = async (nameFile, dataFile, signal) => {
    const data = new Uint8Array(Buffer.from(dataFile));
    await fsPromise.writeFile(nameFile, data, { signal });
    return `El archivo ${nameFile} ha sido guardado satisfactoriamente!`;
}
//Bloquea el hilo principal, sugerido para carga inicial de un servidor o procesos no concurrentes
const usarWriteFilePromiseSync = (nameFile, dataFile) => {
    const data = new Uint8Array(Buffer.from(dataFile));
    fs.writeFileSync(nameFile, data);
    return `El archivo ${nameFile} ha sido guardado satisfactoriamente!`;
}
module.exports = {
    usarWriteFile, usarWriteFilePromise, usarWriteFilePromiseSync
};