// Selecciona el formulario de inicio de sesión
const formularioLogeo = document.querySelector('form');

// Selecciona el elemento div para mostrar el mensaje de error
const mensajeError = document.getElementById('mensajeError');

// Agrega un evento al formulario cuando se envía
formularioLogeo.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita que el formulario se envíe normalmente

  // Obtener datos del formulario
  const nickname = document.getElementById('nickname').value;
  const contraseña = document.getElementById('contraseña').value;

  // Validar datos del formulario
  // ... (código para validar los datos) ...

  // Realizar la solicitud AJAX para verificar las credenciales
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "login.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-formurlencoded");
  xhr.onload = function() {
    if (this.status === 200) {
      // Mostrar mensaje de éxito
      window.location.href = "mi_cuenta.html";
    } else {
      // Mostrar mensaje de error
      mensajeError.style.display = 'inline';
      mensajeError.textContent = "Usuario o contraseña incorrectos.";
    }
  };
  xhr.send("nickname=" + nickname + "&contraseña=" + contraseña);
});

// Agrega este evento al enlace para redirigir a la sección de recuperación
const linkRecupera = document.querySelector('a[href="recupera.html"]');
linkRecupera.addEventListener('click', (event) => {
  event.preventDefault(); // Evita que el enlace se siga normalmente
  window.location.href = "recupera.html"; // Redirige a la sección de recuperación
});