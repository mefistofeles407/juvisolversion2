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

// Procesar formulario de registro
if ($_SERVER['REQUEST_METHOD'] == "POST") {
  // Obtener datos del formulario
  $nombre = $_POST["nombre"];
  $apellido = $_POST["apellido"];
  $correo = $_POST["correo"];
  $cuentaSoles = $_POST["cuentaSoles"];
  $telefono = $_POST["telefono"];
  $nickname = $_POST["nickname"];
  $contraseña = $_POST["contraseña"];
  $preguntaSecreta = $_POST["preguntaSecreta"];

  // Validar datos del formulario
  $errores = [];

  // Validar nombre
  if (!preg_match("/^[a-zA-Z\s]+$/", $nombre)) {
    $errores[] = "El nombre solo debe contener letras y espacios.";
  }

  // Validar apellido
  if (!preg_match("/^[a-zA-Z\s]+$/", $apellido)) {
    $errores[] = "El apellido solo debe contener letras y espacios.";
  }

  // Validar correo electrónico
  if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    $errores[] = "Ingresa un correo electrónico válido.";
  }

  // Validar teléfono
  if (!preg_match("/^[0-9]+$/", $telefono)) {
    $errores[] = "El teléfono solo debe contener números.";
  }

  // Validar nickname
  if (!preg_match("/^[a-zA-Z\s]+$/", $nickname)) {
    $errores[] = "El nickname solo debe contener letras y espacios.";
  } else {
    // Verificar si ya existe un nickname
    $sqlCheckNickname = "SELECT * FROM usuarios WHERE nickname = ?";
    $stmt = $conn->prepare($sqlCheckNickname);
    $stmt->bind_param("s", $nickname);
    $stmt->execute();
    $resultCheckNickname = $stmt->get_result();
    $stmt->close();

    if ($resultCheckNickname->num_rows > 0) {
      $errores[] = "Este nickname ya está en uso. Por favor, elige otro.";
    }
  }

  // Validar contraseña
  if (!preg_match("/[a-zA-Z0-9!@#$%^&*()_+=-\[\]{};':\"\\|,.\<>\/?]/", $contraseña)) {
    $errores[] = "La contraseña debe contener al menos un carácter especial.";
  } else if (strlen($contraseña) < 8) {
    $errores[] = "La contraseña debe tener al menos 8 caracteres.";
  }

  // Validar repetición de contraseña
  if ($_POST["repiteContraseña"] !== $contraseña) {
    $errores[] = "Las contraseñas no coinciden.";
  }

  // Validar pregunta secreta
  if (!preg_match("/^[a-zA-Z\s]+$/", $preguntaSecreta)) {
    $errores[] = "La pregunta secreta solo debe contener letras y espacios.";
  }

  // Si no hay errores, insertar datos en la base de datos
  if (empty($errores)) {
    // Encriptar la contraseña antes de guardarla en la base de datos
    $contraseñaEncriptada = password_hash($contraseña, PASSWORD_DEFAULT);

    // Encriptar la pregunta secreta
    $preguntaSecretaEncriptada = hash('sha256', $preguntaSecreta); 

    // Insertar el usuario en la base de datos
    $sql = "INSERT INTO usuarios (nombre, apellido, correo, cuenta_soles, telefono, nickname, contraseña, pregunta_secreta, estado, nivel) 
             VALUES ('$nombre', '$apellido', '$correo', '$cuentaSoles', '$telefono', '$nickname', '$contraseñaEncriptada', '$preguntaSecretaEncriptada', 'inactivo', 0)";

    if ($conn->query($sql) === TRUE) {
      // Mostrar mensaje de éxito
      echo "<script>
              alert('¡Usuario registrado correctamente!');
              window.location.href = 'mi_cuenta.html';
            </script>";
    } else {
      // Mostrar mensaje de error
      echo "<script>
              alert('Error al registrar el usuario.');
            </script>";
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
