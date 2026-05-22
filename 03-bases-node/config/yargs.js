const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv))
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Es la base de la tabla de multiplicar'
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        demandOption: false,
        default: false,
        describe: 'Muestra la tabla en consola'
    })
    .check((argv, options) => {
        console.log('yargs', argv);
        if (isNaN (argv.b)) {
            throw 'La base tiene que ser un numero';
        }
        return true;
    })
    .parse();

    module.exports = argv;