class Reservaciones {
    constructor(baseUrl) {
        this.baseUrl = baseUrl + 'reservaciones.controller.php';
        this.container = $('#contenido-dinamico');
        this.tituloArea = $('#titulo-area');
    }

    // Cargar la tabla de reservaciones
    cargarTabla() {
        this.tituloArea.text('Gestor de Reservaciones');

        $.ajax({
            url: this.baseUrl + '?op=todos',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                this.renderizarTabla(data);
            },
            error: (xhr, status, error) => {
                this.container.html('<p class="alert alert-danger">Error al cargar Reservaciones.</p>');
            }
        });
    }

    // Renderizar tabla
    renderizarTabla(reservaciones) {
        let html = `
            <button class="btn btn-success mb-3" id="btn-nueva-reservacion">
                <i class="fas fa-calendar-plus"></i> Insertar Nueva Reservación
            </button>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID Cliente</th>
                        <th>ID Sala</th>
                        <th>Fecha de Reservación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        reservaciones.forEach(reservacion => {
            html += `
                <tr>
                    <td>${reservacion.id}</td>
                    <td>${reservacion.id_cliente}</td>
                    <td>${reservacion.id_sala}</td>
                    <td>${reservacion.fecha_reservacion}</td>
                    <td>
                        <button class="btn btn-sm btn-warning btn-editar-reservacion" data-id="${reservacion.id}">
                            Editar
                        </button>
                    </td>
                </tr>
            `;
        });

        html += `</tbody></table>`;
        this.container.html(html);
        this.attachTableEvents();
    }

    // Eventos de tabla
    attachTableEvents() {
        $('#btn-nueva-reservacion').on('click', () => {
            this.renderizarFormulario({});
        });

        $('.btn-editar-reservacion').on('click', (e) => {
            const id = $(e.currentTarget).data('id');
            this.editarReservacion(id);
        });
    }

    // Formulario
    renderizarFormulario(reservacion = {}) {
        const isEditing = reservacion.id !== undefined;
        const title = isEditing ? 'Editar Reservación ID: ' + reservacion.id : 'Insertar Nueva Reservación';
        const btnText = isEditing ? 'Guardar Cambios' : 'Registrar Reservación';

        let html = `
            <h2>${title}</h2>
            <a href="#" class="btn btn-secondary mb-3" id="btn-volver-reservaciones">← Volver al Listado</a>
            <form id="formulario-reservacion">
                <input type="hidden" id="id" name="id" value="${reservacion.id || ''}">

                <div class="mb-3">
                    <label for="id_cliente" class="form-label">ID Cliente</label>
                    <input 
                        type="number" 
                        class="form-control" 
                        id="id_cliente" 
                        name="id_cliente"
                        value="${reservacion.id_cliente || ''}" 
                        required
                    >
                </div>

                <div class="mb-3">
                    <label for="id_sala" class="form-label">ID Sala</label>
                    <input 
                        type="number" 
                        class="form-control" 
                        id="id_sala" 
                        name="id_sala"
                        value="${reservacion.id_sala || ''}" 
                        required
                    >
                </div>

                <div class="mb-3">
                    <label for="fecha_reservacion" class="form-label">Fecha de Reservación</label>
                    <input 
                        type="date" 
                        class="form-control" 
                        id="fecha_reservacion" 
                        name="fecha_reservacion"
                        value="${reservacion.fecha_reservacion || ''}" 
                        required
                    >
                </div>

                <button type="submit" class="btn btn-primary" id="btn-guardar-reservacion">
                    ${btnText}
                </button>
            </form>
        `;

        this.container.html(html);
        this.handleFormSubmit();

        $('#btn-volver-reservaciones').on('click', (e) => {
            e.preventDefault();
            this.cargarTabla();
        });
    }

    // Editar reservación
    editarReservacion(id) {
        $.ajax({
            url: this.baseUrl + '?op=uno',
            type: 'POST',
            data: { id: id },
            dataType: 'json',
            success: (data) => {
                if (data && data.id) {
                    this.renderizarFormulario(data);
                } else {
                    alert('No se encontraron datos para la reservación con ID: ' + id);
                }
            },
            error: (xhr, status, error) => {
                console.error("Error al obtener datos de la reservación ID " + id + ":", error);
                alert('Error al cargar los datos de edición.');
            }
        });
    }

    // Lógica de envío
    handleFormSubmit() {
        $('#formulario-reservacion').on('submit', (e) => {
            e.preventDefault();

            const id = $('#id').val();
            const operation = id ? 'actualizar' : 'insertar';
            const urlController = this.baseUrl + '?op=' + operation;

            let postData = {
                id_cliente: $('#id_cliente').val(),
                id_sala: $('#id_sala').val(),
                fecha_reservacion: $('#fecha_reservacion').val()
            };

            if (id) postData.id = id;

            $.post(urlController, postData, (response) => {
                const success = (response === true || response === 1 || response === "1");

                if (success) {
                    alert(`Reservación ${operation === 'insertar' ? 'registrada' : 'actualizada'} con éxito.`);
                    this.cargarTabla();
                } else {
                    alert(`Error al ${operation === 'insertar' ? 'insertar' : 'actualizar'} la reservación. Respuesta: ${response}`);
                }
            }, 'json').fail(() => {
                alert("Error de conexión o respuesta no JSON.");
            });
        });
    }
}
