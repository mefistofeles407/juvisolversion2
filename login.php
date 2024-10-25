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

// Procesar formulario de login
if ($_SERVER['REQUEST_METHOD'] == "POST") {
  // Obtener datos del formulario
  $nickname = $_POST["nickname"];
  $contraseña = $_POST["contraseña"];

  // Validar datos del formulario
  if (empty($nickname) || empty($contraseña)) {
    echo "<script>document.getElementById('mensajeError').style.display = 'block'; document.getElementById('mensajeError').textContent = 'Por favor, ingresa tu nickname y contraseña.';</script>";
    exit;
  }

  // Verificar si el nickname tiene un formato válido
  if (!preg_match("/^[a-zA-Z\s]+$/", $nickname)) {
    echo "<script>document.getElementById('mensajeError').style.display = 'block'; document.getElementById('mensajeError').textContent = 'El nickname debe contener solo letras y espacios.';</script>";
    exit;
  }

  // Buscar al usuario en la base de datos (con sentencias preparadas)
  $sql = "SELECT * FROM usuarios WHERE nickname = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $nickname);
  $stmt->execute();
  $result = $stmt->get_result();
  $stmt->close();

  // Verificar si el usuario existe
  if ($result->num_rows > 0) {
    // Obtener los datos del usuario
    $row = $result->fetch_assoc();

    // Comparar la contraseña ingresada con la contraseña almacenada
    if (password_verify($contraseña, $row["contraseña"])) {
      // Autenticación exitosa
      // Iniciar sesión
      session_start();
      $_SESSION["usuario_id"] = $row["id"];

      // Redirigir a la sección "mi cuenta"
      header("Location: mi_cuenta.html");
      exit;
    } else {
      // Contraseña incorrecta
      echo "<script>document.getElementById('mensajeError').style.display = 'block'; document.getElementById('mensajeError').textContent = 'Contraseña incorrecta.';</script>";
    }
  } else {
    // Usuario no encontrado
    echo "<script>document.getElementById('mensajeError').style.display = 'block'; document.getElementById('mensajeError').textContent = 'Usuario no encontrado.';</script>";
  }
}

$conn->close();
?>