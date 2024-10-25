// Selecciona el formulario
const actualizarForm = document.getElementById('actualizarForm');

// Agrega un evento al formulario cuando se envía
actualizarForm.addEventListener('submit', (event) => {
  // Evita que el formulario se envíe normalmente
  event.preventDefault();

  // Obtener datos del formulario
  const usuariold = document.querySelector('input[name="usuariold"]').value;
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const correo = document.getElementById('correo').value;
  const cuentaSoles = document.getElementById('cuentaSoles').value;
  const telefono = document.getElementById('telefono').value;
  const contraseñaActual = document.getElementById('contraseñaActual').value;
  const nuevaContraseña = document.getElementById('nuevaContraseña').value;
  const confirmarContraseña = document.getElementById('confirmarContraseña').value;
  const preguntaSecreta = document.getElementById('preguntaSecreta').value;

  // Validar datos del formulario
  let errores = [];

  // Validar nombre
  if (!/[a-zA-Z\s]+$/.test(nombre)) {
    errores.push("El nombre solo debe contener letras y espacios.");
    document.getElementById('errorNombre').style.display = 'inline';
  } else {
    document.getElementById('errorNombre').style.display = 'none';
  }

  // Validar apellido
  if (!/[a-zA-Z\s]+$/.test(apellido)) {
    errores.push("El apellido solo debe contener letras y espacios.");
    document.getElementById('errorApellido').style.display = 'inline';
  } else {
    document.getElementById('errorApellido').style.display = 'none';
  }

  // Validar correo electrónico
  const correoRegex = /^[^\s@]+@[^\s@]+\.gmail\.com$/; // Permite solo correos electrónicos de Gmail
  if (!correoRegex.test(correo)) {
    errores.push("Ingresa un correo electrónico válido de Gmail.");
    document.getElementById('errorCorreo').style.display = 'inline';
  } else {
    document.getElementById('errorCorreo').style.display = 'none';
  }

  // Validar teléfono
  if (!/^[0-9]+$/.test(telefono)) {
    errores.push("El teléfono solo debe contener números.");
    document.getElementById('errorTelefono').style.display = 'inline';
  } else {
    document.getElementById('errorTelefono').style.display = 'none';
  }

  // Validar contraseña actual
  if (!/[a-zA-Z0-9!@#$%^&*()_+=-\[\]{};':"\\|,.\<>\/?]/.test(contraseñaActual)) {
    errores.push("La contraseña actual debe contener al menos un carácter especial.");
    document.getElementById('errorContraseñaActual').style.display = 'inline';
  } else if (contraseñaActual.length < 8) {
    errores.push("La contraseña actual debe tener al menos 8 caracteres.");
    document.getElementById('errorContraseñaActual').style.display = 'inline';
  } else {
    document.getElementById('errorContraseñaActual').style.display = 'none';
  }

  // Validar nueva contraseña
  if (!/[a-zA-Z0-9!@#$%^&*()_+=-\[\]{};':"\\|,.\<>\/?]/.test(nuevaContraseña)) {
    errores.push("La nueva contraseña debe contener al menos un carácter especial.");
    document.getElementById('errorNuevaContraseña').style.display = 'inline';
  } else if (nuevaContraseña.length < 8) {
    errores.push("La nueva contraseña debe tener al menos 8 caracteres.");
    document.getElementById('errorNuevaContraseña').style.display = 'inline';
  } else {
    document.getElementById('errorNuevaContraseña').style.display = 'none';
  }

  // Validar confirmación de contraseña
  if (nuevaContraseña !== confirmarContraseña) {
    errores.push("Las contraseñas no coinciden.");
    document.getElementById('errorConfirmarContraseña').style.display = 'inline';
    document.getElementById('errorConfirmarContraseña').textContent = "Las contraseñas no coinciden.";
  } else {
    document.getElementById('errorConfirmarContraseña').style.display = 'none';
  }

  // Validar pregunta secreta
  if (!/[a-zA-Z\s]+$/.test(preguntaSecreta)) {
    errores.push("La pregunta secreta solo debe contener letras y espacios.");
    document.getElementById('errorPreguntaSecreta').style.display = 'inline';
  } else {
    document.getElementById('errorPreguntaSecreta').style.display = 'none';
  }

  // Si no hay errores, enviar los datos al servidor
  if (errores.length === 0) {
    // Realizar la solicitud AJAX para actualizar los datos
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "actualizar.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-formurlencoded");
    xhr.onload = function() {
      if (this.status === 200) {
        // Mostrar mensaje de éxito
        alert("Datos actualizados correctamente.");
        // Redirigir a la página de "mi cuenta"
        window.location.href = "mi_cuenta.html";
      } else {
        // Mostrar mensaje de error
        alert("Error al actualizar los datos.");
      }
    };
    xhr.send("usuariold=" + usuariold + "&nombre=" + nombre + "&apellido=" + apellido +
    "&correo=" + correo + "&cuentaSoles=" + cuentaSoles + "&telefono=" + telefono +
    "&contraseñaActual=" + contraseñaActual + "&nuevaContraseña=" + nuevaContraseña +
    "&preguntaSecreta=" + preguntaSecreta);
  } else {
    // Mostrar mensajes de error
    alert(errores.join("\n"));
  }
});

// Selecciona todos los enlaces de la barra de navegación
const navLinks = document.querySelectorAll('#nav a');

// Agrega un evento de clic a cada enlace de la barra de navegación
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    // Evita la acción predeterminada del enlace
    event.preventDefault();

    // Obtén la URL del enlace
    const url = link.getAttribute('href');

    // Redirige a la URL del enlace
    window.location.href = url;
  });
});