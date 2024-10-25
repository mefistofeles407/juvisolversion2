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

// Obtener datos del usuario de la base de datos 
$usuarioId = $_SESSION['usuario_id']; 

// Consulta SQL para obtener los datos del usuario (con sentencias preparadas)
$sql = "SELECT nombre, apellido, correo, cuenta_soles, telefono, nickname, nivel, recompensa, estado, contraseña, pregunta_secreta, enlace_referido FROM usuarios WHERE id = ?";

// Preparar la consulta
$stmt = $conn->prepare($sql);

// Unir el parámetro a la consulta
$stmt->bind_param("i", $usuarioId);

// Ejecutar la consulta preparada
$stmt->execute();

// Obtener los resultados
$result = $stmt->get_result();

// Verificar si se encontraron datos
if ($result->num_rows > 0) {
    // Obtener los datos del usuario
    $row = $result->fetch_assoc();

    // Asignar los datos a las variables
    $nombre = $row['nombre'];
    $apellido = $row['apellido'];
    $correo = $row['correo'];
    $cuentaSoles = $row['cuenta_soles'];
    $telefono = $row['telefono'];
    $nickname = $row['nickname'];
    $nivel = $row['nivel'];
    $recompensa = $row['recompensa'];
    $estado = $row['estado'];
    $contraseña = $row['contraseña'];
    $preguntaSecreta = $row['pregunta_secreta'];
    $enlaceReferido = $row['enlace_referido']; // Obtener el enlace de referido

    // Desconexión de la base de datos
    $conn->close();

    // Mostrar la información de la cuenta
    ?>
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>JUVISOL - CUENTA</title>
        <link rel="stylesheet" href="mi_cuenta.css">
    </head>
    <body>
        <nav id="nav">
            <ul>
                <li><a href="conocenos.html">Conócenos</a></li>
                <li><a href="mi_cuenta.html">Cuenta</a></li>
                <li><a href="preguntas.html">Preguntas</a></li>
                <li><a href="red.html">Red de Afiliados</a></li>
            </ul>
        </nav>
        <main>
            <h2 style="text-align: center; font-size: 5em; font-weight: bold; margin-bottom: 50px;">CUENTA</h2>
            <table class="reporte-table" style="margin-top: 50px;">
                <thead>
                    <tr>
                        <th>DATOS</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>NOMBRE (codigo)</td>
                        <td><?php echo $nombre . " " . $apellido; ?></td>
                    </tr>
                    <tr>
                        <td>ESTADO</td>
                        <td><?php echo $estado; ?></td>
                        <td><span id="estadoUsuario" style="display:none;"><?php echo $estado; ?></span></td> 
                    </tr>
                    <tr>
                        <td>CUENTA CORRIENTE EN SOLES (BCP)</td>
                        <td><?php echo $cuentaSoles; ?></td>
                    </tr>
                    <tr>
                        <td>CORREO ELECTRONICO (GMAIL)</td>
                        <td><?php echo $correo; ?></td>
                    </tr>
                    <tr>
                        <td>TELEFONO</td>
                        <td><?php echo $telefono; ?></td>
                    </tr>
                    <tr>
                        <td>NICKNAME</td>
                        <td><?php echo $nickname; ?></td>
                    </tr>
                    <tr>
                        <td>NIVEL</td>
                        <td><?php echo $nivel; ?></td>
                    </tr>
                    <tr>
                        <td>RECOMPENSA</td>
                        <td><?php echo $recompensa; ?></td>
                    </tr>
                    <tr>
                        <td>CONTRASEÑA</td>
                        <td><span id="contraseñaOculta">********</span></td>
                        <td><span id="contraseñaReal" style="display:none;"><?php echo $contraseña; ?></span></td> 
                    </tr>
                    <tr>
                        <td>PREGUNTA SECRETA</td>
                        <td><span id="preguntaSecretaOculta">********</span></td>
                        <td><span id="preguntaSecretaReal" style="display:none;"><?php echo $preguntaSecreta; ?></span></td> 
                    </tr>
                    <tr>
                        <td>ENLACE DE REFERIDO</td>
                        <td><span id="enlaceReferido"><?php echo $enlaceReferido; ?></span></td> 
                    </tr>
                </tbody>
            </table>
            <?php if ($estado == 'inactivo') { ?>
            <form method="post" enctype="multipart/form-data">
                <input type="hidden" name="nombreUsuario" value="<?php echo $nombre; ?>">
                <input type="hidden" name="numeroCuenta" value="<?php echo $cuentaSoles; ?>">
                <label for="deposito">Captura de depósito:</label>
                <input type="file" id="deposito" name="deposito" multiple>
                <button type="submit">Enviar captura</button>
            </form>
            <?php } ?>
        </main>
        <footer></footer>
        <script src="mi_cuenta.js"></script>
    </body>
    </html>
    <?php
} else {
    echo "No se encontró ningún usuario con ese ID.";
}

$conn->close();
?>