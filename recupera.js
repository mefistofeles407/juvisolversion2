// Selecciona el formulario
const recuperaForm = document.getElementById('recuperaForm');

// Agrega un evento al formulario cuando se envía
recuperaForm.addEventListener('submit', (event) => {
  // Evita que el formulario se envíe normalmente
  event.preventDefault();

  // Obtener datos del formulario
  const correo = document.getElementById('correo').value;
  const preguntaSecreta = document.getElementById('preguntaSecreta').value;

  // Validar datos del formulario
  let errores = [];

  // Validar correo electrónico
  const correoRegex = /^[^\s@]+@[^\s@]+\.gmail\.com$/; // Permite solo correos electrónicos de Gmail
  if (!correoRegex.test(correo)) {
    errores.push("Ingresa un correo electrónico válido de Gmail.");
    document.getElementById('errorCorreo').style.display = 'block'; // Mostrar mensaje de error
  } else {
    document.getElementById('errorCorreo').style.display = 'none'; // Ocultar mensaje de error
  }

  // Validar pregunta secreta
  if (!/[a-zA-Z\s]+$/.test(preguntaSecreta)) {
    errores.push("La pregunta secreta solo debe contener letras y espacios.");
    document.getElementById('errorPreguntaSecreta').style.display = 'block'; // Mostrar mensaje de error
  } else {
    document.getElementById('errorPreguntaSecreta').style.display = 'none'; // Ocultar mensaje de error
  }

  // Si no hay errores, enviar los datos al servidor
  if (errores.length === 0) {
    // Realizar la solicitud AJAX para recuperar la contraseña
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "recupera.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-formurlencoded");
    xhr.onload = function() {
      if (this.status === 200) {
        // Mostrar mensaje de éxito
        alert("¡Se ha enviado un correo electrónico con las instrucciones para recuperar tu contraseña!");
      } else {
        // Mostrar mensaje de error
        alert("Error al recuperar la contraseña.");
      }
    };
    xhr.send("correo=" + correo + "&preguntaSecreta=" + preguntaSecreta);
  } else {
    // Mostrar mensajes de error
    alert(errores.join("\n"));
  }
});