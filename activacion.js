// Selecciona el formulario de activación
const formularioActivacion = document.querySelector('form');

// Selecciona el elemento div para mostrar el mensaje de notificación
const mensajeNotificacion = document.getElementById('mensajeNotificacion');

// Agrega un evento al formulario cuando se envía
formularioActivacion.addEventListener('submit', (event) => {
  // Evita que el formulario se envíe normalmente
  event.preventDefault();

  // Obtén los archivos de la captura de depósito
  const archivosDeposito = document.getElementById('deposito').files;

  // Verifica si se ha seleccionado al menos un archivo
  if (archivosDeposito.length > 0) {
    // Itera sobre cada archivo seleccionado
    for (let i = 0; i < archivosDeposito.length; i++) {
      const archivoDeposito = archivosDeposito[i];

      // Valida el tipo de archivo
      if (archivoDeposito.type.startsWith('image/')) {
        // Valida el tamaño del archivo (en KB)
        if (archivoDeposito.size / 1024 <= 500) {
          // Aquí puedes realizar la lógica para procesar la captura de depósito
          // Por ejemplo:
          // 1. Subir la captura a un servidor.
          // 2. Mostrar un mensaje al usuario indicando que se ha recibido la captura.
          // ... tu lógica para procesar la captura ...

          // Después de procesar la captura, puedes enviar el código de activación al usuario
          // ... tu lógica para generar y enviar el código

          // Mostrar la notificación de aprobación
          mensajeNotificacion.textContent = "Su envío ha sido aprobado.";
          mensajeNotificacion.style.color = "green";

          // Actualiza la tabla de estado del envío
          document.getElementById('estadoEnvio').textContent = "Aprobado";
          document.getElementById('descripcionEnvio').textContent = "Se ha verificado el depósito. Su cuenta ha sido activada.";
        } else {
          // Mostrar un mensaje de error al usuario si el archivo es demasiado grande
          mensajeNotificacion.textContent = "El archivo es demasiado grande. Por favor, selecciona un archivo de menos de 500 КВ.";
          mensajeNotificacion.style.color = "red";
          break; // Detener la iteración si hay un error
        }
      } else {
        // Mostrar un mensaje de error al usuario si el archivo no es una imagen
        mensajeNotificacion.textContent = "Por favor, selecciona un archivo de imagen.";
        mensajeNotificacion.style.color = "red";
        break; // Detener la iteración si hay un error
      }
    }
  } else {
    // Mostrar un mensaje de error al usuario si no se ha seleccionado ningún archivo
    mensajeNotificacion.textContent = "Por favor, selecciona la captura de tu depósito.";
    mensajeNotificacion.style.color = "red";
  }
});