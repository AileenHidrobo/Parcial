class Salas {
    constructor(baseUrl) {
        this.baseUrl = baseUrl + 'salas.controller.php';
        this.container = $('#contenido-dinamico');
        this.tituloArea = $('#titulo-area');
    }

    // Cargar tabla de salas
    cargarTabla() {
        this.tituloArea.text('Gestor de Salas');

        $.ajax({
            url: this.baseUrl + '?op=todos',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                this.renderizarTabla(data);
            },
            error: () => {
                this.container.html('<p class="alert alert-danger">Error al cargar Salas.</p>');
            }
        });
    }

    // Renderizar tabla
    renderizarTabla(salas) {
        let html = `
            <button class="btn btn-success mb-3" id="btn-nueva-sala">
                <i class="fas fa-door-open"></i> Insertar Nueva Sala
            </button>

            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Capacidad</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        salas.forEach(sala => {
            html += `
                <tr>
                    <td>${sala.id}</td>
                    <td>${sala.nombre}</td>
                    <td>${sala.capacidad}</td>
                    <td>${sala.descripcion || ''}</td>
                    <td>
                        <button class="btn btn-sm btn-warning btn-editar-sala" data-id="${sala.id}">
                            Editar
                        </button>
                    </td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        this.container.html(html);
        this.attachTableEvents();
    }

    // Eventos de tabla
    attachTableEvents() {
        $('#btn-nueva-sala').on('click', () => {
            this.renderizarFormulario({});
        });

        $('.btn-editar-sala').on('click', (e) => {
            const id = $(e.currentTarget).data('id');
            this.editarSala(id);
        });
    }

    // Formulario
    renderizarFormulario(sala = {}) {
        const isEditing = sala.id !== undefined;
        const title = isEditing ? 'Editar Sala ID: ' + sala.id : 'Insertar Nueva Sala';
        const btnText = isEditing ? 'Guardar Cambios' : 'Registrar Sala';

        let html = `
            <h2>${title}</h2>
            <a href="#" class="btn btn-secondary mb-3" id="btn-volver-salas">← Volver al Listado</a>

            <form id="formulario-sala">
                <input type="hidden" id="id" name="id" value="${sala.id || ''}">

                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input 
                        type="text" class="form-control" id="nombre" name="nombre" 
                        value="${sala.nombre || ''}" required>
                </div>

                <div class="mb-3">
                    <label for="capacidad" class="form-label">Capacidad</label>
                    <input 
                        type="number" class="form-control" id="capacidad" name="capacidad" 
                        value="${sala.capacidad || ''}" required>
                </div>

                <div class="mb-3">
                    <label for="descripcion" class="form-label">Descripción</label>
                    <textarea 
                        class="form-control" id="descripcion" name="descripcion"
                    >${sala.descripcion || ''}</textarea>
                </div>

                <button type="submit" class="btn btn-primary">${btnText}</button>
            </form>
        `;

        this.container.html(html);
        this.handleFormSubmit();

        $('#btn-volver-salas').on('click', (e) => {
            e.preventDefault();
            this.cargarTabla();
        });
    }

    // Cargar info de una sala para editar
    editarSala(id) {
        $.ajax({
            url: this.baseUrl + '?op=uno',
            type: 'POST',
            data: { id: id },
            dataType: 'json',
            success: (data) => {
                if (data && data.id) {
                    this.renderizarFormulario(data);
                } else {
                    alert('No se encontraron datos para la sala con ID: ' + id);
                }
            },
            error: () => {
                alert('Error al cargar los datos de la sala.');
            }
        });
    }

    // Envío del formulario
    handleFormSubmit() {
        $('#formulario-sala').on('submit', (e) => {
            e.preventDefault();

            const id = $('#id').val();
            const operation = id ? 'actualizar' : 'insertar';
            const urlController = this.baseUrl + '?op=' + operation;

            let postData = {
                nombre: $('#nombre').val(),
                capacidad: $('#capacidad').val(),
                descripcion: $('#descripcion').val()
            };

            if (id) postData.id = id;

            $.post(urlController, postData, (response) => {
                const success = (response === true || response == 1 || response == "1");

                if (success) {
                    alert(`Sala ${operation === 'insertar' ? 'registrada' : 'actualizada'} con éxito.`);
                    this.cargarTabla();
                } else {
                    alert(`Error al ${operation}. Respuesta: ${response}`);
                }
            }, 'json').fail(() => {
                alert("Error de conexión o respuesta no JSON.");
            });
        });
    }
}