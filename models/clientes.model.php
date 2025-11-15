<?php
/* CRUD DE CLIENTES */

// Ruta de conexión: igual que en tus otros modelos
require_once('../config/conexion.php');

class Cliente_Model {

    /* ================================
       LISTAR TODOS
    ================================== */
    public function todos() {
        $cnn = new Clase_Conectar();
        $con = $cnn->Procedimiento_Conectar();

        $cadena = "SELECT * FROM clientes";

        $stmt = $con->prepare($cadena);
        $stmt->execute();
        $datos = $stmt->get_result(); 
        $con->close();
        return $datos;
    }

    /* ================================
       OBTENER UNO
    ================================== */
    public function uno($id_cliente) {
        $cnn = new Clase_Conectar();
        $con  = $cnn->Procedimiento_Conectar();

        $cadena = "SELECT * FROM clientes WHERE id_cliente = ?";
        $stmt = $con->prepare($cadena);
        $stmt->bind_param('i', $id_cliente);
        $stmt->execute();
        $datos = $stmt->get_result();
        $con->close();
        return $datos;
    }

    /* ================================
       INSERTAR
    ================================== */
    public function insertar($nombre, $correo, $telefono) {
        $cnn = new Clase_Conectar();
        $con = $cnn->Procedimiento_Conectar();

        $cadena = "INSERT INTO clientes(nombre, correo, telefono) VALUES (?, ?, ?)";

        $stmt = $con->prepare($cadena);
        // nombre (string), correo (string), telefono (string)
        $stmt->bind_param('sss', $nombre, $correo, $telefono);
        $resultado = $stmt->execute();
        $con->close();

        return $resultado;
    }

    /* ================================
       ACTUALIZAR
    ================================== */
    public function actualizar($id, $nombre, $correo, $telefono) {
        $cnn = new Clase_Conectar();
        $con = $cnn->Procedimiento_Conectar();

        $cadena = "UPDATE clientes SET nombre = ?, correo = ?, telefono = ? WHERE id_cliente = ?";

        $stmt = $con->prepare($cadena);
        // 3 strings + 1 int (id_cliente)
        $stmt->bind_param('sssi', $nombre, $correo, $telefono, $id);
        $resultado = $stmt->execute();
        $con->close();
        return $resultado;
    }

    /* ================================
       ELIMINAR
    ================================== */
    public function eliminar($id) {
        $cnn = new Clase_Conectar();
        $con = $cnn->Procedimiento_Conectar();

        $id = intval($id);

        $cadena = "DELETE FROM clientes WHERE id_cliente = $id";

        $datos = mysqli_query($con, $cadena);
        mysqli_close($con);
        return $datos;
    }
}
?>
