$(document).ready(function() {
    
    const BASE_URL = '../controllers/';

    console.log('main.js cargado');
    console.log('Clientes:', typeof Clientes, 'Reservaciones:', typeof Reservaciones, 'Salas:', typeof Salas);

    const clientesModule = new Clientes(BASE_URL);
    const reservacionesModule = new Reservaciones(BASE_URL);
    const salasModule = new Salas(BASE_URL);

    // Botón clientes
    $('#btn-clientes').on('click', function(e) {
        e.preventDefault();
        console.log('Click en Clientes');
        clientesModule.cargarTabla();
    });

    // Botón reservaciones
    $('#btn-reservaciones').on('click', function(e) {
        e.preventDefault();
        console.log('Click en Reservaciones');
        reservacionesModule.cargarTabla();
    });

    // Botón salas
    $('#btn-salas').on('click', function(e) {
        e.preventDefault();
        console.log('Click en Salas');
        salasModule.cargarTabla();
    });

});
