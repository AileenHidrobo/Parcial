<?php
/* CONTROLADOR DE RESERVACIONES */

require_once('../models/reservaciones.model.php');

$reservacion = new Reservacion_Model();

switch($_GET["op"]) {

    case "todos":
        $datos = $reservacion->todos();
        $todos = array();
        while($fila = mysqli_fetch_assoc($datos)) {
            $todos[] = $fila;
        }
        echo json_encode($todos);
        break;

    case "uno":
        $id = $_POST["id"];
        $datos = $reservacion->uno($id);
        $uno = mysqli_fetch_assoc($datos);
        echo json_encode($uno);
        break;

    case "insertar":
        $id_cliente        = $_POST["id_cliente"];
        $id_sala           = $_POST["id_sala"];
        $fecha_reservacion = $_POST["fecha_reservacion"];

        $resultado = $reservacion->insertar($id_cliente, $id_sala, $fecha_reservacion);
        echo json_encode($resultado);
        break;

    case "actualizar":
        $id                = $_POST["id"];
        $id_cliente        = $_POST["id_cliente"];
        $id_sala           = $_POST["id_sala"];
        $fecha_reservacion = $_POST["fecha_reservacion"];

        $resultado = $reservacion->actualizar($id, $id_cliente, $id_sala, $fecha_reservacion);
        echo json_encode($resultado);
        break;

    case "eliminar":
        $id = $_POST["id"];
        $resultado = $reservacion->eliminar($id);
        echo json_encode($resultado);
        break;

    default:
        echo json_encode(array("error" => "Operación no válida"));
        break;
}
?>