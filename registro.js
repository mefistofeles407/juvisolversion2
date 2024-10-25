// Selecciona el formulario
const registroForm = document.getElementById('registroForm');

// Agrega un evento al formulario cuando se envía
registroForm.addEventListener('submit', (event) => {
  // Evita que el formulario se envíe normalmente
  event.preventDefault();

  // Obtener datos del formulario
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const correo = document.getElementById('correo').value;
  const cuentaSoles = document.getElementById('cuentaSoles').value;
  const telefono = document.getElementById('telefono').value;
  const nickname = document.getElementById('nickname').value;
  const contraseña = document.getElementById('contraseña').value;
  const repiteContraseña = document.getElementById('repiteContraseña').value;
  const preguntaSecreta = document.getElementById('preguntaSecreta').value;

  // Validar datos del formulario
  let errores = [];

  // Validar nombre
  if (!/[a-zA-Z\s]+$/.test(nombre)) {
    errores.push("El nombre solo debe contener letras y espacios.");
    document.getElementById('errorNombres').textContent = "El nombre solo debe contener letras y espacios.";
    document.getElementById('errorNombres').style.display = 'block';
  } else {
    document.getElementById('errorNombres').textContent = "";
    document.getElementById('errorNombres').style.display = 'none';
  }

  // Validar apellido
  if (!/[a-zA-Z\s]+$/.test(apellido)) {
    errores.push("El apellido solo debe contener letras y espacios.");
    document.getElementById('errorApellidos').textContent = "El apellido solo debe contener letras y espacios.";
    document.getElementById('errorApellidos').style.display = 'block';
  } else {
    document.getElementById('errorApellidos').textContent = "";
    document.getElementById('errorApellidos').style.display = 'none';
  }

  // Validar correo electrónico
  const correoRegex = /^[^\s@]+@[^\s@]+\.gmail\.com$/; // Permite solo correos electrónicos de Gmail
  if (!correoRegex.test(correo)) {
    errores.push("Ingresa un correo electrónico válido de Gmail.");
    document.getElementById('errorCorreo').textContent = "Ingresa un correo electrónico válido de Gmail.";
    document.getElementById('errorCorreo').style.display = 'block';
  } else {
    document.getElementById('errorCorreo').textContent = "";
    document.getElementById('errorCorreo').style.display = 'none';
  }

  // Validar teléfono
  if (!/^[0-9]+$/.test(telefono)) {
    errores.push("El teléfono solo debe contener números.");
    document.getElementById('errorTelefono').textContent = "El teléfono solo debe contener números.";
    document.getElementById('errorTelefono').style.display = 'block';
  } else {
    document.getElementById('errorTelefono').textContent = "";
    document.getElementById('errorTelefono').style.display = 'none';
  }

  // Validar nickname
  if (!/[a-zA-Z\s]+$/.test(nickname)) {
    errores.push("El nickname solo debe contener letras y espacios.");
    document.getElementById('errorNickname').textContent = "El nickname solo debe contener letras y espacios.";
    document.getElementById('errorNickname').style.display = 'block';
  } else {
    document.getElementById('errorNickname').textContent = "";
    document.getElementById('errorNickname').style.display = 'none';
  }

  // Validar contraseña
  if (!/[a-zA-Z0-9!@#$%^&*()_+=-\\[\]{};':"\\|,.\<\>\\/?]/.test(contraseña)) {
    errores.push("La contraseña debe contener al menos un carácter especial.");
    document.getElementById('errorContraseña').textContent = "La contraseña debe contener al menos un carácter especial.";
    document.getElementById('errorContraseña').style.display = 'block';
  } else if (contraseña.length < 8) {
    errores.push("La contraseña debe tener al menos 8 caracteres.");
    document.getElementById('errorContraseña').textContent = "La contraseña debe tener al menos 8 caracteres.";
    document.getElementById('errorContraseña').style.display = 'block';
  } else {
    document.getElementById('errorContraseña').textContent = "";
    document.getElementById('errorContraseña').style.display = 'none';
  }

  // Validar repetición de contraseña
  if (contraseña !== repiteContraseña) {
    errores.push("Las contraseñas no coinciden.");
    document.getElementById('errorRepiteContraseña').textContent = "Las contraseñas no coinciden.";
    document.getElementById('errorRepiteContraseña').style.display = 'block';
  } else {
    document.getElementById('errorRepiteContraseña').textContent = "";
    document.getElementById('errorRepiteContraseña').style.display = 'none';
  }

  // Validar pregunta secreta
  if (!/[a-zA-Z\s]+$/.test(preguntaSecreta)) {
    errores.push("La pregunta secreta solo debe contener letras y espacios.");
    document.getElementById('errorPreguntaSecreta').textContent = "La pregunta secreta solo debe contener letras y espacios.";
    document.getElementById('errorPreguntaSecreta').style.display = 'block';
  } else {
    document.getElementById('errorPreguntaSecreta').textContent = "";
    document.getElementById('errorPreguntaSecreta').style.display = 'none';
  }

  // Si no hay errores, enviar los datos al servidor
  if (errores.length === 0) {
    // Realizar la solicitud AJAX para registrar el usuario
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "registro.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-formurlencoded");
    xhr.onload = function() {
      if (this.status === 200) {
        // Mostrar mensaje de éxito
        alert("¡Usuario registrado correctamente!");
        // Redirigir a la página de "mi cuenta"
        window.location.href = "mi_cuenta.html";
      } else {
        // Mostrar mensaje de error
        alert("Error al registrar el usuario.");
      }
    };
    xhr.send("nombre=" + nombre + "&apellido=" + apellido + "&correo=" + correo + "&cuentaSoles=" + cuentaSoles + "&telefono=" + telefono + "&nickname=" + nickname + "&contraseña=" + contraseña + "&preguntaSecreta=" + preguntaSecreta);
  } else {
    // Mostrar mensajes de error
    // ... (código para mostrar los mensajes de error) ...
  }
});