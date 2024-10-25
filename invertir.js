// Selecciona el botón para confirmar la inversión
const btnConfirmarInversion = document.getElementById('btn-confirmar-inversion');

// Selecciona el campo para ingresar el monto de inversión
const montoInversion = document.getElementById('monto-inversion');

// Selecciona el campo para subir la captura del depósito
const capturaDeposito = document.getElementById('captura-deposito');

// Agrega un evento al botón para confirmar la inversión
btnConfirmarInversion.addEventListener('click', () => {
    // Obtener el plan seleccionado
    const planSeleccionado = document.querySelector('.plan.active').dataset.plan;

    // Obtener el monto de inversión
    const monto = montoInversion.value;

    // Obtener el archivo de la captura del depósito
    const archivo = capturaDeposito.files[0];

    // Validar los datos del formulario
    if (!planSeleccionado || !monto || !archivo) {
        // Mostrar un mensaje de error si falta información
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Validar el tipo de archivo (debe ser una imagen)
    if (!archivo.type.startsWith('image/')) {
        alert('Por favor, selecciona una imagen.');
        return;
    }

    // Validar el tamaño del archivo (en KB)
    if (archivo.size / 1024 > 500) {
        alert('El archivo es demasiado grande. Por favor, selecciona un archivo de menos de 500 KB.');
        return;
    }

    // Si la información es válida, enviar la solicitud al servidor
    const formData = new FormData();
    formData.append('plan', planSeleccionado);
    formData.append('monto', monto);
    formData.append('captura', archivo);

    fetch('/invertir.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Mostrar mensaje de confirmación
            alert('¡Inversión confirmada!');

            // Limpiar el formulario
            montoInversion.value = '';
            capturaDeposito.value = '';
        } else {
            // Mostrar mensaje de error
            alert('Hubo un error al procesar la inversión.');
        }
    })
    .catch(error => {
        // Mostrar mensaje de error
        console.error('Error:', error);
        alert('Hubo un error al procesar la inversión.');
    });
});

// Agrega un evento de clic a cada plan de inversión
const planes = document.querySelectorAll('.plan');
planes.forEach(plan => {
    plan.addEventListener('click', () => {
        // Elimina la clase "active" de todos los planes
        planes.forEach(p => p.classList.remove('active'));

        // Agrega la clase "active" al plan seleccionado
        plan.classList.add('active');
    });
});
