class Clientes {
    constructor(baseUrl) {
        // Ajusta el nombre del controller si es distinto
        this.baseUrl = baseUrl + 'clientes.controller.php';
        this.container = $('#contenido-dinamico');
        this.tituloArea = $('#titulo-area');
    }

    // Cargar la tabla de clientes
    cargarTabla() {
        this.tituloArea.text('Gestor de Clientes');

        $.ajax({
            url: this.baseUrl + '?op=todos',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                this.renderizarTabla(data);
            },
            error: (xhr, status, error) => {
                this.container.html('<p class="alert alert-danger">Error al cargar Clientes.</p>');
            }
        });
    }

    // Renderizar tabla
    renderizarTabla(clientes) {
        let html = `
            <button class="btn btn-success mb-3" id="btn-nuevo-cliente">
                <i class="fas fa-calendar-check"></i> Insertar Nuevo Cliente
            </button>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        clientes.forEach(cliente => {
            html += `
                <tr>
                    <td>${cliente.id_cliente}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.correo}</td>
                    <td>${cliente.telefono}</td>
                    <td>
                        <button class="btn btn-sm btn-warning btn-editar-cliente" data-id="${cliente.id_cliente}">
                            Editar
                        </button>
                    </td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        this.container.html(html);
        this.attachTableEvents();
    }

    // Eventos de la tabla
    attachTableEvents() {
        $('#btn-nuevo-cliente').on('click', () => {
            this.renderizarFormulario({});
        });

        $('.btn-editar-cliente').on('click', (e) => {
            const id_cliente = $(e.currentTarget).data('id');
            this.editarCliente(id_cliente);
        });
    }

    // Renderizar formulario
    renderizarFormulario(cliente = {}) {
        const isEditing = cliente.id_cliente !== undefined;
        const title = isEditing ? 'Editar Cliente ID: ' + cliente.id_cliente : 'Insertar Nuevo Cliente';
        const btnText = isEditing ? 'Guardar Cambios' : 'Registrar Cliente';

        let html = `
            <h2>${title}</h2>
            <a href="#" class="btn btn-secondary mb-3" id="btn-volver-clientes">← Volver al Listado</a>
            <form id="formulario-cliente">
                <input type="hidden" id="id" name="id_cliente" value="${cliente.id_cliente || ''}">
                
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="nombre" 
                        name="nombre" 
                        value="${cliente.nombre || ''}" 
                        required
                    >
                </div>

                <div class="mb-3">
                    <label for="correo" class="form-label">Correo</label>
                    <input 
                        type="email" 
                        class="form-control" 
                        id="correo" 
                        name="correo" 
                        value="${cliente.correo || ''}" 
                        required
                    >
                </div>

                <div class="mb-3">
                    <label for="telefono" class="form-label">Teléfono</label>
                    <input 
                        type="tel" 
                        class="form-control" 
                        id="telefono" 
                        name="telefono" 
                        value="${cliente.telefono || ''}" 
                        required
                    >
                </div>

                <button type="submit" class="btn btn-primary" id="btn-guardar-cliente">
                    ${btnText}
                </button>
            </form>
        `;

        this.container.html(html);
        this.handleFormSubmit();

        $('#btn-volver-clientes').on('click', (e) => {
            e.preventDefault();
            this.cargarTabla();
        });
    }

    // Editar cliente
    editarCliente(id) {
        $.ajax({
            url: this.baseUrl + '?op=uno',
            type: 'POST',
            // 🔴 AQUÍ ESTABA EL PROBLEMA: id_cliente no existía, uso el parámetro id
            data: { id_cliente: id }, 
            dataType: 'json',
            success: (data) => {
                if (data && data.id_cliente) {
                    this.renderizarFormulario(data);
                } else {
                    alert('No se encontraron datos para el cliente con ID: ' + id);
                }
            },
            error: (xhr, status, error) => {
                console.error("Error al obtener datos del cliente ID " + id + ":", error);
                alert('Error al cargar los datos de edición.');
            }
        });
    }

    // Lógica de envío del formulario
    handleFormSubmit() {
        $('#formulario-cliente').on('submit', (e) => {
            e.preventDefault();

            const idcliente = $('#id').val();
            const operation = idcliente ? 'actualizar' : 'insertar';
            const urlController = this.baseUrl + '?op=' + operation;

            let postData = {
                nombre: $('#nombre').val(),
                correo: $('#correo').val(),
                telefono: $('#telefono').val()
            };

            if (idcliente) postData.id_cliente = idcliente;

            $.post(urlController, postData, (response) => {
                const success = (response === true || response === 1 || response === "1" || response === "true");

                if (success) {
                    alert(`Cliente ${operation === 'insertar' ? 'registrado' : 'actualizado'} con éxito.`);
                    this.cargarTabla();
                } else {
                    alert(`Error al ${operation === 'insertar' ? 'insertar' : 'actualizar'} el cliente. Respuesta: ${response}`);
                }
            }, 'json').fail(() => {
                alert("Error de conexión o respuesta no JSON.");
            });
        });
    }
}
