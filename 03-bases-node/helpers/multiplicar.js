const colors = require('colors');
const obtenerTabla = (multiplicando, limite, mostrarListado) => {
    console.clear();
    console.log("=====================================".green);
    console.log(`${colors.green('Tabla del')} ${multiplicando.toString().blue}`);
    console.log("=====================================".green);
    let multiplicadorLimite = limite;
    let salida = '';
    let salidaColores = '';
    for (let index = 1; index <= multiplicadorLimite; index++) {
        salida += `${multiplicando} X ${index} = ${multiplicando * index}\n`;
        salidaColores += `${multiplicando} ${colors.green('X')} ${index} ${colors.green('=')} ${multiplicando * index}\n`;
    }
    return {
        salida,
        salidaColores,
    };
}

module.exports = {
    obtenerTabla
}