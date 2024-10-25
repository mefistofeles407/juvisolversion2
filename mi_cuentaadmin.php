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

        case "guardarUsuario":
            // Obtener los datos del usuario
            $usuarioId = $_POST["usuarioId"];
            $nombre = $_POST["nombre"];
            $apellido = $_POST["apellido"];
            $correo = $_POST["correo"];
            $cuentaSoles = $_POST["cuentaSoles"];
            $telefono = $_POST["telefono"];
            $nickname = $_POST["nickname"];
            $nivel = $_POST["nivel"];
            $estado = $_POST["estado"];
            $contraseña = $_POST["contraseña"];
            $preguntaSecreta = $_POST["preguntaSecreta"];

            // Actualizar los datos del usuario en la base de datos
            $sql = "UPDATE usuarios SET nombre = '$nombre', apellido = '$apellido', correo = '$correo', cuenta_soles = '$cuentaSoles', telefono = '$telefono', nickname = '$nickname', nivel = '$nivel', estado = '$estado', contraseña = '$contraseña', pregunta_secreta = '$preguntaSecreta' WHERE id = $usuarioId";

            if ($conn->query($sql) === TRUE) {
                echo "OK";
            } else {
                echo "Error al actualizar los datos del usuario.";
            }
            break;

        default:
            echo "Acción inválida.";
            break;
    }
}

$conn->close();
?>