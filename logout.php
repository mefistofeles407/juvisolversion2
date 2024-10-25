<?php
session_start(); // Iniciar la sesión
session_destroy(); // Destruir la sesión

// Redirigir a la página de inicio o login
header("Location: login.html");
exit;
?>