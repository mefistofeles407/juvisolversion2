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

// Procesar formulario de recuperación de contraseña
if ($_SERVER['REQUEST_METHOD'] == "POST") {
  // Obtener datos del formulario
  $correo = $_POST["correo"];
  $preguntaSecreta = $_POST["preguntaSecreta"];

  // Validar datos del formulario
  $errores = [];

  // Validar correo electrónico
  if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    $errores[] = "Ingresa un correo electrónico válido.";
  }

  // Validar pregunta secreta
  if (!preg_match("/^[a-zA-Z\s]+$/", $preguntaSecreta)) {
    $errores[] = "La pregunta secreta solo debe contener letras y espacios.";
  }

  // Si no hay errores, buscar al usuario en la base de datos
  if (empty($errores)) {
    // Encriptar la pregunta secreta proporcionada por el usuario
    $preguntaSecretaEncriptada = hash('sha256', $preguntaSecreta);

    $sql = "SELECT * FROM usuarios WHERE correo = ? AND pregunta_secreta = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $correo, $preguntaSecretaEncriptada); 
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();

      // Obtener la contraseña del usuario
      $contraseña = $row["contraseña"];

      // Enviar correo electrónico con la contraseña
      $asunto = "Recuperación de contraseña - JUVISOL";
      $mensaje = "Tu contraseña es: $contraseña";
      $headers = "From: noreply@juvisol.com"; // Reemplaza con tu correo electrónico

      // Usar la función mail() para enviar el correo electrónico
      if (mail($correo, $asunto, $mensaje, $headers)) {
        echo "<script>
                alert('¡Se ha enviado un correo electrónico con tu contraseña!');
                window.location.href = 'login.html';
              </script>";
      } else {
        echo "<script>
                alert('Error al enviar el correo electrónico.');
              </script>";
      }
    } else {
      echo "<script>
              alert('Los datos ingresados no coinciden con ningún usuario.');
            </script>";
    }
  } else {
    echo "<script>
            alert('" . implode("\n", $errores) . "');
          </script>";
  }
}

$conn->close();
?>