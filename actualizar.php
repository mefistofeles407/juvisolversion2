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

// Procesar formulario de actualización de datos
if ($_SERVER['REQUEST_METHOD'] == "POST") {
  // Obtener datos del formulario
  $usuariold = $_POST["usuariold"];
  $nombre = $_POST["nombre"];
  $apellido = $_POST["apellido"];
  $correo = $_POST["correo"];
  $cuentaSoles = $_POST["cuentaSoles"];
  $telefono = $_POST["telefono"];
  $contraseñaActual = $_POST["contraseñaActual"];
  $nuevaContraseña = $_POST["nuevaContraseña"];
  $preguntaSecreta = $_POST["preguntaSecreta"];

  // Validar datos del formulario
  $errores = [];

  // Validar nombre
  if (!empty($nombre) && !preg_match("/^[a-zA-Z\s]+$/", $nombre)) {
    $errores[] = "El nombre solo debe contener letras y espacios.";
  }

  // Validar apellido
  if (!empty($apellido) && !preg_match("/^[a-zA-Z\s]+$/", $apellido)) {
    $errores[] = "El apellido solo debe contener letras y espacios.";
  }

  // Validar correo electrónico
  if (!empty($correo) && !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    $errores[] = "Ingresa un correo electrónico válido.";
  }

  // Validar teléfono
  if (!empty($telefono) && !preg_match("/^[0-9]+$/", $telefono)) {
    $errores[] = "El teléfono solo debe contener números.";
  }

  // Validar contraseña actual
  if (!empty($contraseñaActual) && !empty($nuevaContraseña)) {
    $sqlSelect = "SELECT * FROM usuarios WHERE id = $usuariold";
    $resultSelect = $conn->query($sqlSelect);

    if ($resultSelect->num_rows > 0) {
      $rowSelect = $resultSelect->fetch_assoc();
      $contraseñaGuardada = $rowSelect['contraseña'];

      if (!password_verify($contraseñaActual, $contraseñaGuardada)) {
        echo "Contraseña actual incorrecta.";
        exit;
      }
    } else {
      echo "Usuario no encontrado.";
      exit;
    }
  }

  // Validar pregunta secreta
  if (!empty($preguntaSecreta) && !preg_match("/^[a-zA-Z\s]+$/", $preguntaSecreta)) {
    $errores[] = "La pregunta secreta solo debe contener letras y espacios.";
  }

  // Si no hay errores, actualizar los datos del usuario en la base de datos
  if (empty($errores)) {
    $sql = "UPDATE usuarios SET";

    if (!empty($nombre)) {
      $sql .= " nombre = '$nombre',";
    }

    if (!empty($apellido)) {
      $sql .= " apellido = '$apellido',";
    }

    if (!empty($correo)) {
      $sql .= " correo = '$correo',";
    }

    if (!empty($cuentaSoles)) {
      $sql .= " cuenta_soles = '$cuentaSoles',";
    }

    if (!empty($telefono)) {
      $sql .= " telefono = '$telefono',";
    }

    if (!empty($nuevaContraseña)) {
      $nuevaContraseñaEncriptada = password_hash($nuevaContraseña, PASSWORD_DEFAULT);
      $sql .= " contraseña = '$nuevaContraseñaEncriptada',";
    }

    if (!empty($preguntaSecreta)) {
      $sql .= " pregunta_secreta = '$preguntaSecreta',";
    }

    // Eliminar la última coma y espacio de la consulta SQL
    $sql = trim($sql, ", ");

    // Agregar la condición WHERE a la consulta SQL
    $sql .= " WHERE id = $usuariold";

    // Ejecutar la consulta SQL
    if ($conn->query($sql) === TRUE) {
      // Redirigir a la página de "mi cuenta"
      header("Location: mi_cuenta.html");
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
  } else {
    echo "<script>
            alert('" . implode("\n", $errores) . "');
          </script>";
  }
}

$conn->close();
?>