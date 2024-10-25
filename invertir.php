<?php

// Datos de conexión a la base de datos
$servername = "127.0.0.1:3306";
$username = "u340969567_artefactosonli";
$password = "Shionersz123!";
$dbname = "u340969567_artefactosonli";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Comprueba si se ha enviado la solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Obtener los datos del formulario
  $plan = $_POST['plan'];
  $monto = $_POST['monto'];
  $captura = $_FILES['captura'];

  // Validar los datos del formulario
  if (empty($plan) || empty($monto) || empty($captura['name'])) {
    echo json_encode(['error' => 'Por favor, completa todos los campos.']);
    exit;
  }

  // Validar el tipo de archivo
  if (!in_array($captura['type'], ['image/jpeg', 'image/png'])) {
    echo json_encode(['error' => 'El archivo no es una imagen válida.']);
    exit;
  }

  // Validar el tamaño del archivo
  if ($captura['size'] > 500000) { // 500 KB
    echo json_encode(['error' => 'El archivo es demasiado grande.']);
    exit;
  }

  // Obtener el ID del usuario (asumiendo que está en sesión)
  $usuario_id = $_SESSION['usuario_id']; // Reemplaza con tu lógica para obtener el ID del usuario

  // Subir la captura del depósito
  $carpeta_destino = 'uploads/'; // Define la carpeta donde se guardarán las capturas
  $nombre_archivo = uniqid() . '_' . $captura['name']; // Genera un nombre único para el archivo
  $ruta_archivo = $carpeta_destino . $nombre_archivo;

  if (move_uploaded_file($captura['tmp_name'], $ruta_archivo)) {
    // Guardar la información de la inversión en la base de datos
    $sql = "INSERT INTO inversiones (usuario_id, plan, monto, estado) VALUES ('$usuario_id', '$plan', '$monto', 'pendiente')";

    if ($conn->query($sql) === TRUE) {
      // Obtener el ID de la inversión recién creada
      $inversion_id = $conn->insert_id;

      // Guardar la información de la captura del depósito
      $sql = "INSERT INTO deposit_captures_inversion (inversion_id, file_name, file_path) VALUES ('$inversion_id', '$nombre_archivo', '$ruta_archivo')";

      if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => 'Inversión registrada correctamente.']);
      } else {
        echo json_encode(['error' => 'Error al guardar la captura del depósito.']);
      }
    } else {
      echo json_encode(['error' => 'Error al guardar la inversión.']);
    }
  } else {
    echo json_encode(['error' => 'Error al subir la captura del depósito.']);
  }
}

$conn->close();

?>