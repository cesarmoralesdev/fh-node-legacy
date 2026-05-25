require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


const main = async() => {
    //Iniciamos con la opcion seleccionada vacia
    let opt = '';
    //Creamos objeto de clase Tareas
    const tareas = new Tareas();
    //Leemos archivo .json si existe
    const tareasDB = leerDB();
    //Si existem cargamos las tareas del archivo a la propiedad _listado del objeto tareas
    if ( tareasDB ) {
        tareas.cargarTareasFromArray( tareasDB );
    }
    //Usamos do while que que despues de elegir cualquier opcion se vuelva a pintar el menu de opciones
    //salvo que se seleccione la opcion '0'
    do {
        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //Crear opcion para ingresar la descripcion de la tarea nueva
                const desc = await leerInput('Descripción:');
                //Agrega tarea en el arreglo
                tareas.crearTarea( desc );
            break;

            case '2':
                //Muestra listado de tareas
                tareas.listadoCompleto();
            break;
            
            case '3': // listar completadas
                tareas.listarPendientesCompletadas(true);
            break;

            case '4': // listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5': // completado | pendiente
                //Muestra opcion checklist
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                //cambia estado a tarea, enviando como parametro la lista de ids seleccionados 
                tareas.toggleCompletadas( ids );
            break;
                       
            case '6': // Borrar
                //Muestra opcion rawlit de seleccion unica
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const ok = await confirmar('¿Está seguro?');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
            break;
        
        }

        //Despues de seleccionar una opcion con el switch, guardamos el listado de tareas en el archivo json
        guardarDB( tareas.listadoArr );

        //Las opciones de pause solo se muestran despues de seleccionar una opcion
        await pausa();

    } while( opt !== '0' );     //Si elige cero salimos de la aplicacion 
}


main();

