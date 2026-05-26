require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {
    // Clase busquedas
    const busquedas = new Busquedas();
    let opt;

    do {
        //Menu mostrado cuando inicia la aplicacion
        opt = await inquirerMenu();
        //Validamos que opcion se selecciona
        switch (opt) {
            case 1:
                // Mostrar mensaje y solicitar input
                const termino = await leerInput('Ciudad: ');
                // Buscar los lugares usando el endpoint de maptiler
                const lugares = await busquedas.ciudad(termino);
                // Seleccionar el lugar, usando un menu rawlist 
                const id = await listarLugares(lugares);
                // Si selecciono 0 no baja el bloque de codigo, sale de la aplicacion
                if (id === '0') continue;
                // Busco lugar seleccionado en la lista de lugares encontrado
                const lugarSel = lugares.find(l => l.id === id);
                // Guardar en historial y en DB
                busquedas.agregarHistorial(lugarSel.nombre);
                // Obtenemos datos del clima, segun latitud y longitud
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                // Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre.green);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:', clima.min);
                console.log('Máxima:', clima.max);
                console.log('Como está el clima:', clima.desc.green);
                break;
            case 2:
                // Recorrer historial
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${lugar} `);
                })
                break;
        }
        if (opt !== 0) await pausa();
    } while (opt !== 0)
}

main();