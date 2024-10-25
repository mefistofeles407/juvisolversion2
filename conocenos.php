<?php
// Datos de conexión a la base de datos
$servername = "127.0.0.1:3306";
$username = "u340969567_artefactosonli";
$password = "Shionersz123!";
$dbname = "u340969567_artefactosonli";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}

// Cerrar conexión
$conn->close();
?>