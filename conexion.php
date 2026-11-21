<?php
$host = "127.0.0.1";
$db = "inventario_computo";
$user = "root";
$pass = "";
try {
    $pdo = new PDO("mysql:host=$host;port=3306;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    header("Content-Type: application/json; charset=utf-8");
    exit(json_encode(["error" => "No se pudo conectar a la base de datos."]));
}