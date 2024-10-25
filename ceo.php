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

// Procesar solicitudes AJAX
if ($_SERVER['REQUEST_METHOD'] == "POST") {
  $accion = $_POST["accion"];

  switch ($accion) {
    case "obtenerUsuarios":
      // Obtener la lista de usuarios
      $sql = "SELECT * FROM usuarios";
      $result = $conn->query($sql);
      // Convertir los datos a formato JSON
      $usuarios = array();
      if ($result->num_rows > 0) {
          while ($row = $result->fetch_assoc()) {
              $usuarios[] = $row;
          }
      }
      echo json_encode($usuarios);
      break;

    case "obtenerUsuario":
      // Obtener los datos de un usuario específico
      $usuarioId = $_POST["usuarioId"];
      $sql = "SELECT * FROM usuarios WHERE id = $usuarioId";
      $result = $conn->query($sql);
      // Convertir los datos a formato JSON
      $usuario = array();
      if ($result->num_rows > 0) {
          $usuario = $result->fetch_assoc();
      }
      echo json_encode($usuario);
      break;

    case "activarCuenta":
      // Activar la cuenta del usuario
      $usuarioId = $_POST["usuarioId"];
      $sql = "UPDATE usuarios SET estado = 'activo', nivel = 1 WHERE id = $usuarioId";
      if ($conn->query($sql) === TRUE) {
          // Generar enlace de referido (puedes usar una función para esto)
          $enlaceReferido = generarEnlaceReferido($usuarioId);

          // Actualizar el enlace de referido en la base de datos
          $sql = "UPDATE usuarios SET enlace_referido = '$enlaceReferido' WHERE id = $usuarioId";
          if ($conn->query($sql) === TRUE) {
              echo "OK";
          } else {
              echo "Error al actualizar el enlace de referido.";
          }
      } else {
          echo "Error al activar la cuenta.";
      }
      break;

    case "desactivarCuenta":
      // Desactivar la cuenta del usuario
      $usuarioId = $_POST["usuarioId"];
      $sql = "UPDATE usuarios SET estado = 'inactivo' WHERE id = $usuarioId";
      if ($conn->query($sql) === TRUE) {
          echo "OK";
      } else {
          echo "Error al desactivar la cuenta.";
      }
      break;

    case "obtenerDepositos":
      // Obtener la información de las capturas de depósito
      $sql = "SELECT * FROM deposit_captures_activacion"; // Selecciona de la tabla correcta
      $result = $conn->query($sql);
      // Convertir los datos a formato JSON
      $depositos = array();
      if ($result->num_rows > 0) {
          while ($row = $result->fetch_assoc()) {
              $depositos[] = $row;
          }
      }
      echo json_encode($depositos);
      break;

    default:
      echo "Acción inválida.";
      break;
  }
}

$conn->close();

// Función para generar un enlace de referido
function generarEnlaceReferido($usuarioId) {
    // Genera un enlace único (puedes usar una función para esto)
    $enlaceReferido = "https://tu-sitio-web.com/referido?id=" . $usuarioId;
    return $enlaceReferido;
}
?>