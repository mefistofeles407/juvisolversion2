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

if ($_SERVER['REQUEST_METHOD'] == "POST") {
  $accion = $_POST["accion"];

  switch ($accion) {
    case "obtenerRed":
      $usuarioId = $_POST["usuarioId"];

      // Obtener la información del usuario actual
      $sqlUsuario = "SELECT * FROM usuarios WHERE id = $usuarioId";
      $resultUsuario = $conn->query($sqlUsuario);
      $usuario = $resultUsuario->fetch_assoc();

      // Obtener la información de los usuarios directos
      $sqlDirectos = "SELECT * FROM usuarios WHERE enlace_referido = '$usuario[enlace_referido]' AND id != $usuarioId";
      $resultDirectos = $conn->query($sqlDirectos);
      $directos = array();
      while ($row = $resultDirectos->fetch_assoc()) {
        $directos[] = $row;
      }

      // Obtener la información de los usuarios indirectos
      $sqlIndirectos = "SELECT * FROM usuarios WHERE enlace_referido IN (SELECT enlace_referido FROM usuarios WHERE enlace_referido = '$usuario[enlace_referido]' AND id != $usuarioId) AND id != $usuarioId";
      $resultIndirectos = $conn->query($sqlIndirectos);
      $indirectos = array();
      while ($row = $resultIndirectos->fetch_assoc()) {
        $indirectos[] = $row;
      }

      // Crear el array de la red
      $red = array(
        "usuario" => $usuario,
        "directos" => $directos,
        "indirectos" => $indirectos
      );

      echo json_encode($red);
      break;

    default:
      echo "Acción inválida.";
      break;
  }
}

$conn->close();
?>