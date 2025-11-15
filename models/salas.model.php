<?php
/* CRUD DE SALAS */

require_once('../config/conexion.php');

class Sala_Model {

    // Obtener todas las salas
    public function todos() {
        $con = new Clase_Conectar();
        $con = $con->Procedimiento_Conectar();
        $cadena = "SELECT * FROM salas";
        $stmt = $con->prepare($cadena);
        $stmt->execute();
        $datos = $stmt->get_result();
        $con->close();
        return $datos;
    }

    // Obtener una sala por ID
    public function uno($id) {
        $con = new Clase_Conectar();
        $con = $con->Procedimiento_Conectar();
        $cadena = "SELECT * FROM salas WHERE id = ?";
        $stmt = $con->prepare($cadena);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $datos = $stmt->get_result();
        $con->close();
        return $datos;
    }

    // Insertar nueva sala
    public function insertar($nombre, $capacidad, $descripcion) {
        $con = new Clase_Conectar();
        $con = $con->Procedimiento_Conectar();
        $cadena = "INSERT INTO salas(nombre, capacidad, descripcion) VALUES (?, ?, ?)";
        $stmt = $con->prepare($cadena);
        $stmt->bind_param('sis', $nombre, $capacidad, $descripcion);
        $resultado = $stmt->execute();
        $con->close();
        return $resultado;
    }

    // Actualizar sala existente
    public function actualizar($id, $nombre, $capacidad, $descripcion) {
        $con = new Clase_Conectar();
        $con = $con->Procedimiento_Conectar();
        $cadena = "UPDATE salas SET nombre = ?, capacidad = ?, descripcion = ? WHERE id = ?";
        $stmt = $con->prepare($cadena);
        $stmt->bind_param('sisi', $nombre, $capacidad, $descripcion, $id);
        $resultado = $stmt->execute();
        $con->close();
        return $resultado;
    }

    // Eliminar sala
    public function eliminar($id) {
        $con = new Clase_Conectar();
        $con = $con->Procedimiento_Conectar();
        $cadena = "DELETE FROM salas WHERE id = ?";
        $stmt = $con->prepare($cadena);
        $stmt->bind_param('i', $id);
        $resultado = $stmt->execute();
        $con->close();
        return $resultado;
    }
}
?>