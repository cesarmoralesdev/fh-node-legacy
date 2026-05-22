const obtenerTabla = (multiplicando, mostrarListado) => {
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

module.exports = {
    obtenerTabla
}