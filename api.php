<?php
header("Content-Type: application/json");
require 'conexion.php';
$metodo = $_SERVER['REQUEST_METHOD'];

switch ($metodo) {
    // LEER (Read)
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM equipos ORDER BY id DESC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    // CREAR (Create)
    case 'POST':
        $datos = json_decode(file_get_contents("php://input"), true);
        $sql = "INSERT INTO equipos (nombre, categoria, precio, stock) VALUES (?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$datos['nombre'], $datos['categoria'], $datos['precio'], $datos['stock']]);
        echo json_encode(["mensaje" => "Equipo agregado correctamente"]);
        break;

    // ACTUALIZAR (Update)
    case 'PUT':
        $datos = json_decode(file_get_contents("php://input"), true);
        $sql = "UPDATE equipos SET nombre=?, categoria=?, precio=?, stock=? WHERE id=?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$datos['nombre'], $datos['categoria'], $datos['precio'], $datos['stock'], $datos['id']]);
        echo json_encode(["mensaje" => "Equipo actualizado correctamente"]);
        break;

    // ELIMINAR (Delete)
    case 'DELETE':
        $id = $_GET['id'];
        $sql = "DELETE FROM equipos WHERE id=?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        echo json_encode(["mensaje" => "Equipo eliminado correctamente"]);
        break;
}
?>