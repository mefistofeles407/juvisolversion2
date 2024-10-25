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

// Procesar formulario de activación de cuenta
if ($_SERVER['REQUEST_METHOD'] == "POST") {
  // Obtener datos del formulario
  $usuarioId = $_POST["usuariold"]; // Corregido: usuarioId en lugar de usuariold
  $deposito = $_FILES["deposito"];

  // Validar datos del formulario
  $errores = [];

  // Validar si se seleccionó al menos un archivo
  if (empty($deposito['name'][0])) {
    $errores[] = "Por favor, selecciona la captura de tu depósito.";
  }

  // Si no hay errores, procesar la captura del depósito
  if (empty($errores)) {
    // Crear la carpeta "uploads" si no existe
    if (!is_dir('uploads')) {
      mkdir('uploads', 0777, true);
    }

    // Itera sobre cada archivo seleccionado
    for ($i = 0; $i < count($deposito['name']); $i++) {
      // Verifica si el archivo es una imagen
      if (strpos($deposito['type'][$i], 'image/') === 0) {
        // Verifica el tamaño del archivo (en KB)
        if ($deposito['size'][$i] / 1024 <= 500) {
          // Guarda el archivo en el servidor
          $nombreArchivo = uniqid() . '_' . basename($deposito['name'][$i]);
          $rutaDestino = 'uploads/' . $nombreArchivo; // Define la ruta donde se guardarán los archivos
          move_uploaded_file($deposito['tmp_name'][$i], $rutaDestino);

          // Guarda la información del archivo en la base de datos
          $sql = "INSERT INTO deposit_captures_activacion (user_id, file_name, file_path) VALUES (?, ?, ?)"; // Consulta preparada
          $stmt = $conn->prepare($sql);
          $stmt->bind_param("sss", $usuarioId, $nombreArchivo, $rutaDestino);
          if ($stmt->execute()) {
            // Mostrar la notificación de aprobación
            echo "<script>
            document.getElementById('mensajeNotificacion').textContent = 'Su envío ha sido recibido. Se revisará en las próximas 24 horas.';
            document.getElementById('mensajeNotificacion').style.color = 'green';
            document.getElementById('estadoEnvio').textContent = 'En espera';
            document.getElementById('descripcionEnvio').textContent = 'Se ha recibido la captura del depósito. Se revisará en las próximas 24 horas.';
            </script>";
          } else {
            echo "<script>
            document.getElementById('mensajeNotificacion').textContent = 'Error al guardar la captura. Por favor, inténtalo de nuevo.';
            document.getElementById('mensajeNotificacion').style.color = 'red';
            </script>";
          }
          $stmt->close();
        } else {
          // Mostrar un mensaje de error al usuario si el archivo es demasiado grande
          echo "<script>
          document.getElementById('mensajeNotificacion').textContent = 'El archivo es demasiado grande. Por favor, selecciona un archivo de menos de 500 KB.';
          document.getElementById('mensajeNotificacion').style.color = 'red';
          </script>";
          break; // Detener la iteración si hay un error
        }
      } else {
        // Mostrar un mensaje de error al usuario si el archivo no es una imagen
        echo "<script>
        document.getElementById('mensajeNotificacion').textContent = 'Por favor, selecciona un archivo de imagen.';
        document.getElementById('mensajeNotificacion').style.color = 'red';
        </script>";
        break; // Detener la iteración si hay un error
      }
    }
  } else {
    // Mostrar mensajes de error
    echo "<script>
            alert('" . implode("\n", $errores) . "');
          </script>";
  }
}
$conn->close();
?>