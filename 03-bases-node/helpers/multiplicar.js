const colors = require('colors');
const obtenerTabla = (multiplicando, mostrarListado) => {
    console.clear();
    console.log("=====================================".green);
    console.log(`${colors.green('Tabla del')} ${multiplicando.toString().blue}`);
    console.log("=====================================".green);
    let multiplicadorLimite = 10;
    let salida = '';
    for (let index = 1; index <= multiplicadorLimite; index++)
        salida += `${multiplicando} ${colors.green('X')} ${index} ${colors.green('=')} ${multiplicando * index}\n`;
    return salida;
}

module.exports = {
    obtenerTabla
}