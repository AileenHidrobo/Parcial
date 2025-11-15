<?php
/* CONTROLADOR DE SALAS */

require_once('../models/salas.model.php');

$sala = new Sala_Model();

switch($_GET["op"]) {

    case "todos":
        $datos = $sala->todos();
        $todos = array();
        while($fila = mysqli_fetch_assoc($datos)) {
            $todos[] = $fila;
        }
        echo json_encode($todos);
        break;

    case "uno":
        $id = $_POST["id"];
        $datos = $sala->uno($id);
        $uno = mysqli_fetch_assoc($datos);
        echo json_encode($uno);
        break;

    case "insertar":
        $nombre     = $_POST["nombre"];
        $capacidad  = $_POST["capacidad"];
        $descripcion = $_POST["descripcion"];

        $resultado = $sala->insertar($nombre, $capacidad, $descripcion);
        echo json_encode($resultado);
        break;

    case "actualizar":
        $id         = $_POST["id"];
        $nombre     = $_POST["nombre"];
        $capacidad  = $_POST["capacidad"];
        $descripcion = $_POST["descripcion"];

        $resultado = $sala->actualizar($id, $nombre, $capacidad, $descripcion);
        echo json_encode($resultado);
        break;

    case "eliminar":
        $id = $_POST["id"];
        $resultado = $sala->eliminar($id);
        echo json_encode($resultado);
        break;

    default:
        echo json_encode(array("error" => "Operación no válida"));
        break;
}
?>