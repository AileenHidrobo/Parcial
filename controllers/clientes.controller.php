<?php
/* CONTROLADOR DE CLIENTES */

require_once('../models/clientes.model.php');

$cliente = new Cliente_Model();

switch($_GET["op"]) {

    case "todos":
        $datos = $cliente->todos();
        $todos = array();
        while($fila = mysqli_fetch_assoc($datos)) {
            $todos[] = $fila;
        }
        echo json_encode($todos);
        break;

    case "uno":
        // ANTES: $id = $_POST["id"];
        $id = $_POST["id_cliente"];
        $datos = $cliente->uno($id);
        $uno = mysqli_fetch_assoc($datos);
        echo json_encode($uno);
        break;

    case "insertar":
        $nombre   = $_POST["nombre"];
        $correo   = $_POST["correo"];
        $telefono = $_POST["telefono"];

        $resultado = $cliente->insertar($nombre, $correo, $telefono);
        echo json_encode($resultado);
        break;

    case "actualizar":
        // aquí ya estabas usando id_cliente, esto está bien
        $id       = $_POST["id_cliente"];
        $nombre   = $_POST["nombre"];
        $correo   = $_POST["correo"];
        $telefono = $_POST["telefono"];

        $resultado = $cliente->actualizar($id, $nombre, $correo, $telefono);
        echo json_encode($resultado);
        break;

    case "eliminar":
        // ANTES: $id = $_POST["id"];
        $id = $_POST["id_cliente"];
        $resultado = $cliente->eliminar($id);
        echo json_encode($resultado);
        break;

    default:
        echo json_encode(array("error" => "Operación no válida"));
        break;
}
?>
