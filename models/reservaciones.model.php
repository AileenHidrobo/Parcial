<?php
/* CRUD DE RESERVACIONES */

require_once('../config/conexion.php');

class Reservacion_Model {

    // Obtener todas las reservaciones
    public function todos() {
        $con = new Clase_Conectar();
        $con = $con->Procedimiento_Conectar();
        $cadena = "SELECT * FROM reservaciones";
        $stmt = $con->prepare($cadena);
        $stmt->execute();
        $datos = $stmt->get_result();
        $con->close();
        return $datos;
    }

    // Obtener una reservación por ID
    public function uno($id) {
        $con = new Clase_Conectar();
        $con = $con->Procedimiento_Conectar();
        $cadena = "SELECT * FROM reservaciones WHERE id = ?";
        $stmt = $con->prepare($cadena);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $datos = $stmt->get_result();
        $con->close();
        return $datos;
    }

    // Insertar reservación
    public function insertar($id_cliente, $id_sala, $fecha_reservacion) {
        $con = new Clase_Conectar();
        $con = $con->Procedimiento_Conectar();
        $cadena = "INSERT INTO reservaciones(id_cliente, id_sala, fecha_reservacion) VALUES (?, ?, ?)";
        $stmt = $con->prepare($cadena);
        $stmt->bind_param('iis', $id_cliente, $id_sala, $fecha_reservacion);
        $resultado = $stmt->execute();
        $con->close();
        return $resultado;
    }

    // Actualizar reservación
    public function actualizar($id, $id_cliente, $id_sala, $fecha_reservacion) {
        $con = new Clase_Conectar();
        $con = $con->Procedimiento_Conectar();
        $cadena = "UPDATE reservaciones SET id_cliente = ?, id_sala = ?, fecha_reservacion = ? WHERE id = ?";
        $stmt = $con->prepare($cadena);
        $stmt->bind_param('iisi', $id_cliente, $id_sala, $fecha_reservacion, $id);
        $resultado = $stmt->execute();
        $con->close();
        return $resultado;
    }

    // Eliminar reservación
    public function eliminar($id) {
        $con = new Clase_Conectar();
        $con = $con->Procedimiento_Conectar();
        $cadena = "DELETE FROM reservaciones WHERE id = ?";
        $stmt = $con->prepare($cadena);
        $stmt->bind_param('i', $id);
        $resultado = $stmt->execute();
        $con->close();
        return $resultado;
    }
}
?>