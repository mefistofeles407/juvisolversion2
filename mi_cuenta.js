// Mostrar la contraseña al hacer clic
const contraseñaOculta = document.getElementById('contraseñaOculta');
const contraseñaReal = document.getElementById('contraseñaReal').textContent; // Obtener la contraseña real del PHP

contraseñaOculta.onclick = function() {
  // Cambia el texto del elemento a la contraseña real
  contraseñaOculta.textContent = contraseñaReal;
};

// Mostrar la pregunta secreta al hacer clic
const preguntaSecretaOculta = document.getElementById('preguntaSecretaOculta');
const preguntaSecretaReal = document.getElementById('preguntaSecretaReal').textContent; // Obtener la pregunta secreta real del PHP

preguntaSecretaOculta.onclick = function() {
  // Cambia el texto del elemento a la pregunta secreta real
  preguntaSecretaOculta.textContent = preguntaSecretaReal;
};

// Ocultar/Mostrar enlaces de afiliación e inversión
const afiliacionLink = document.getElementById('afiliacionLink');
const inversionLink = document.getElementById('inversionLink');

const estadoUsuario = document.getElementById('estadoUsuario').textContent; // Obtener el estado del usuario desde el atributo data-estado

if (estadoUsuario === 'inactivo') {
  afiliacionLink.style.display = 'none';
  inversionLink.style.display = 'none';
} else {
  afiliacionLink.style.display = 'block';
  inversionLink.style.display = 'block';
}