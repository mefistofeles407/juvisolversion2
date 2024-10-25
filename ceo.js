// Selecciona las tablas
const tablaUsuarios = document.getElementById('tablaUsuarios');
const tablaDepositos = document.getElementById('tablaDepositos'); 

// Función para mostrar los datos del usuario
function mostrarDatosUsuario(usuarioId) {
  // Realizar la solicitud AJAX para obtener los datos del usuario
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "ceo.php", true); // Abre una conexión al servidor
  xhr.setRequestHeader("Content-type", "application/x-www-formurlencoded"); // Define el tipo de contenido
  xhr.onload = function() {
    if (this.status === 200) {
      // Mostrar los datos del usuario en un modal o en una nueva página
      const usuario = JSON.parse(this.responseText);
      // Puedes usar un modal o una nueva página para mostrar los datos
      // Ejemplo con un modal:
      // $('#modalUsuario').modal('show');
      // $('#modalUsuario #nombre').text(usuario.nombre);
      // $('#modalUsuario #apellido').text(usuario.apellido);
      // ... (mostrar otros datos del usuario) ...
    } else {
      // Mostrar mensaje de error
      alert("Error al obtener los datos del usuario.");
    }
  };
  xhr.send(`accion=obtenerUsuario&usuarioId=${usuarioId}`); // Envía la solicitud al servidor
}

// Función para activar la cuenta del usuario
function activarCuentaUsuario(usuarioId) {
  // Realizar la solicitud AJAX para activar la cuenta del usuario
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "ceo.php", true); // Abre una conexión al servidor
  xhr.setRequestHeader("Content-type", "application/x-www-formurlencoded"); // Define el tipo de contenido
  xhr.onload = function() {
    if (this.status === 200) {
      // Actualizar la tabla de usuarios
      actualizarTablaUsuarios(); // Llama a la función para actualizar la tabla
    } else {
      // Mostrar mensaje de error
      alert("Error al activar la cuenta del usuario.");
    }
  };
  xhr.send(`accion=activarCuenta&usuarioId=${usuarioId}`); // Envía la solicitud al servidor
}

// Función para desactivar la cuenta del usuario
function desactivarCuentaUsuario(usuarioId) {
  // Realizar la solicitud AJAX para desactivar la cuenta del usuario
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "ceo.php", true); // Abre una conexión al servidor
  xhr.setRequestHeader("Content-type", "application/x-www-formurlencoded"); // Define el tipo de contenido
  xhr.onload = function() {
    if (this.status === 200) {
      // Actualizar la tabla de usuarios
      actualizarTablaUsuarios(); // Llama a la función para actualizar la tabla
    } else {
      // Mostrar mensaje de error
      alert("Error al desactivar la cuenta del usuario.");
    }
  };
  xhr.send(`accion=desactivarCuenta&usuarioId=${usuarioId}`); // Envía la solicitud al servidor
}

// Función para actualizar la tabla de usuarios
function actualizarTablaUsuarios() {
  // Realizar la solicitud AJAX para obtener la lista de usuarios
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "ceo.php", true); // Abre una conexión al servidor
  xhr.setRequestHeader("Content-type", "application/x-www-formurlencoded"); // Define el tipo de contenido
  xhr.onload = function() {
    if (this.status === 200) {
      // Mostrar la lista de usuarios en la tabla
      const usuarios = JSON.parse(this.responseText);
      tablaUsuarios.innerHTML = ''; // Limpia la tabla antes de agregar los datos
      const thead = tablaUsuarios.createTHead();
      const row = thead.insertRow();
      const idCell = row.insertCell();
      const nombreCell = row.insertCell();
      const apellidoCell = row.insertCell();
      const correoCell = row.insertCell();
      const cuentaSolesCell = row.insertCell();
      const telefonoCell = row.insertCell();
      const nicknameCell = row.insertCell();
      const nivelCell = row.insertCell();
      const estadoCell = row.insertCell();
      const accionesCell = row.insertCell();
      idCell.textContent = 'ID';
      nombreCell.textContent = 'Nombre';
      apellidoCell.textContent = 'Apellido';
      correoCell.textContent = 'Correo';
      cuentaSolesCell.textContent = 'Cuenta Soles';
      telefonoCell.textContent = 'Teléfono';
      nicknameCell.textContent = 'Nickname';
      nivelCell.textContent = 'Nivel';
      estadoCell.textContent = 'Estado';
      accionesCell.textContent = 'Acciones';
      usuarios.forEach(usuario => {
        // Crea una nueva fila en la tabla
        const fila = tablaUsuarios.insertRow();
        // Crea las celdas de la fila
        const celdald = fila.insertCell();
        const celdaNombre = fila.insertCell();
        const celdaApellido = fila.insertCell();
        const celdaCorreo = fila.insertCell();
        const celdaCuentaSoles = fila.insertCell();
        const celdaTelefono = fila.insertCell();
        const celdaNickname = fila.insertCell();
        const celdaNivel = fila.insertCell();
        const celdaEstado = fila.insertCell();
        const celdaAcciones = fila.insertCell();
        // Agrega el contenido de las celdas
        celdald.textContent = usuario.id;
        celdaNombre.textContent = usuario.nombre;
        celdaApellido.textContent = usuario.apellido;
        celdaCorreo.textContent = usuario.correo;
        celdaCuentaSoles.textContent = usuario.cuenta_soles;
        celdaTelefono.textContent = usuario.telefono;
        celdaNickname.textContent = usuario.nickname;
        celdaNivel.textContent = usuario.nivel;
        celdaEstado.textContent = usuario.estado;
        // Agrega el enlace para mostrar los datos del usuario
        const enlaceDatos = document.createElement('a');
        enlaceDatos.href = '#';
        enlaceDatos.textContent = 'Ver datos';
        enlaceDatos.dataset.usuarioId = usuario.id;
        celdaAcciones.appendChild(enlaceDatos);
        // Agrega el botón para activar la cuenta del usuario
        const botonActivar = document.createElement('button');
        botonActivar.classList.add('btn', 'btn-activar');
        botonActivar.dataset.usuarioId = usuario.id;
        botonActivar.textContent = 'Activar';
        celdaAcciones.appendChild(botonActivar);
        // Agrega el botón para desactivar la cuenta del usuario
        const botonDesactivar = document.createElement('button');
        botonDesactivar.classList.add('btn', 'btn-desactivar');
        botonDesactivar.dataset.usuarioId = usuario.id;
        botonDesactivar.textContent = 'Desactivar';
        celdaAcciones.appendChild(botonDesactivar);
      });
    } else {
      // Mostrar mensaje de error
      alert("Error al obtener la lista de usuarios.");
    }
  };
  xhr.send("accion=obtenerUsuarios");
}

// Función para actualizar la tabla de depósitos
function actualizarTablaDepositos() {
  // Realizar la solicitud AJAX para obtener la lista de depósitos
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "ceo.php", true); // Abre una conexión al servidor
  xhr.setRequestHeader("Content-type", "application/x-www-formurlencoded"); // Define el tipo de contenido
  xhr.onload = function() {
    if (this.status === 200) {
      // Mostrar la lista de depósitos en la tabla
      const depositos = JSON.parse(this.responseText);
      tablaDepositos.innerHTML = ''; // Limpia la tabla antes de agregar los datos
      const thead = tablaDepositos.createTHead();
      const row = thead.insertRow();
      const idCell = row.insertCell();
      const usuarioCell = row.insertCell();
      const nombreArchivoCell = row.insertCell();
      const rutaArchivoCell = row.insertCell();
      const fechaCargaCell = row.insertCell();
      const accionesCell = row.insertCell();
      idCell.textContent = 'ID';
      usuarioCell.textContent = 'Usuario';
      nombreArchivoCell.textContent = 'Nombre del archivo';
      rutaArchivoCell.textContent = 'Ruta del archivo';
      fechaCargaCell.textContent = 'Fecha de carga';
      accionesCell.textContent = 'Acciones';
      depositos.forEach(deposito => {
        // Crea una nueva fila en la tabla
        const fila = tablaDepositos.insertRow();
        // Crea las celdas de la fila
        const celdald = fila.insertCell();
        const celdaUsuario = fila.insertCell();
        const celdaNombreArchivo = fila.insertCell();
        const celdaRutaArchivo = fila.insertCell();
        const celdaFechaCarga = fila.insertCell();
        const celdaAcciones = fila.insertCell();
        // Agrega el contenido de las celdas
        celdald.textContent = deposito.id;
        celdaUsuario.textContent = deposito.user_id; // Mostrar el ID del usuario
        celdaNombreArchivo.textContent = deposito.file_name;
        celdaRutaArchivo.textContent = deposito.file_path;
        celdaFechaCarga.textContent = deposito.upload_date;
        // Agrega el enlace para ver la captura del depósito
        const enlaceVerCaptura = document.createElement('a');
        enlaceVerCaptura.href = deposito.file_path; // Mostrar la ruta del archivo
        enlaceVerCaptura.textContent = 'Ver captura';
        celdaAcciones.appendChild(enlaceVerCaptura);
      });
    } else {
      // Mostrar mensaje de error
      alert("Error al obtener la lista de depósitos.");
    }
  };
  xhr.send("accion=obtenerDepositos");
}

// Agrega un evento de clic a cada fila de la tabla
tablaUsuarios.addEventListener('click', (event) => {
  // Verifica si el clic fue en un enlace o en un botón
  if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
    // Obtiene el ID del usuario
    const usuarioId = event.target.dataset.usuarioId;

    // Realiza la acción correspondiente
    if (event.target.tagName === 'A') {
      mostrarDatosUsuario(usuarioId);
    } else if (event.target.tagName === 'BUTTON') {
      if (event.target.classList.contains('btn-activar')) {
        activarCuentaUsuario(usuarioId);
      } else if (event.target.classList.contains('btn-desactivar')) {
        desactivarCuentaUsuario(usuarioId);
      } 
    }
  }
});

// Agrega un evento de clic a cada fila de la tabla de depósitos
tablaDepositos.addEventListener('click', (event) => {
  // Verifica si el clic fue en un enlace o en un botón
  if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
    // Obtiene el ID del depósito
    const depositoId = event.target.dataset.depositoId; // Suponiendo que agregaste un atributo data-depositoId a los enlaces y botones

    // Realiza la acción correspondiente
    if (event.target.tagName === 'A') {
      // ... (lógica para ver la captura del depósito) ...
    } else if (event.target.tagName === 'BUTTON') {
      if (event.target.classList.contains('btn-eliminar')) {
        // ... (lógica para eliminar la captura del depósito) ...
      }
    }
  }
});

// Función para actualizar la tabla de usuarios
function actualizarTablaUsuarios() {
  // Realizar la solicitud AJAX para obtener la lista de usuarios
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "ceo.php", true); // Abre una conexión al servidor
  xhr.setRequestHeader("Content-type", "application/x-www-formurlencoded"); // Define el tipo de contenido
  xhr.onload = function() {
    if (this.status === 200) {
      // Mostrar la lista de usuarios en la tabla
      const usuarios = JSON.parse(this.responseText);
      tablaUsuarios.innerHTML = ''; // Limpia la tabla antes de agregar los datos
      const thead = tablaUsuarios.createTHead();
      const row = thead.insertRow();
      const idCell = row.insertCell();
      const nombreCell = row.insertCell();
      const apellidoCell = row.insertCell();
      const correoCell = row.insertCell();
      const cuentaSolesCell = row.insertCell();
      const telefonoCell = row.insertCell();
      const nicknameCell = row.insertCell();
      const nivelCell = row.insertCell();
      const estadoCell = row.insertCell();
      const accionesCell = row.insertCell();
      idCell.textContent = 'ID';
      nombreCell.textContent = 'Nombre';
      apellidoCell.textContent = 'Apellido';
      correoCell.textContent = 'Correo';
      cuentaSolesCell.textContent = 'Cuenta Soles';
      telefonoCell.textContent = 'Teléfono';
      nicknameCell.textContent = 'Nickname';
      nivelCell.textContent = 'Nivel';
      estadoCell.textContent = 'Estado';
      accionesCell.textContent = 'Acciones';
      usuarios.forEach(usuario => {
        // Crea una nueva fila en la tabla
        const fila = tablaUsuarios.insertRow();
        // Crea las celdas de la fila
        const celdald = fila.insertCell();
        const celdaNombre = fila.insertCell();
        const celdaApellido = fila.insertCell();
        const celdaCorreo = fila.insertCell();
        const celdaCuentaSoles = fila.insertCell();
        const celdaTelefono = fila.insertCell();
        const celdaNickname = fila.insertCell();
        const celdaNivel = fila.insertCell();
        const celdaEstado = fila.insertCell();
        const celdaAcciones = fila.insertCell();
        // Agrega el contenido de las celdas
        celdald.textContent = usuario.id;
        celdaNombre.textContent = usuario.nombre;
        celdaApellido.textContent = usuario.apellido;
        celdaCorreo.textContent = usuario.correo;
        celdaCuentaSoles.textContent = usuario.cuenta_soles;
        celdaTelefono.textContent = usuario.telefono;
        celdaNickname.textContent = usuario.nickname;
        celdaNivel.textContent = usuario.nivel;
        celdaEstado.textContent = usuario.estado;
        // Agrega el enlace para mostrar los datos del usuario
        const enlaceDatos = document.createElement('a');
        enlaceDatos.href = '#';
        enlaceDatos.textContent = 'Ver datos';
        enlaceDatos.dataset.usuarioId = usuario.id;
        celdaAcciones.appendChild(enlaceDatos);
        // Agrega el botón para activar la cuenta del usuario
        const botonActivar = document.createElement('button');
        botonActivar.classList.add('btn', 'btn-activar');
        botonActivar.dataset.usuarioId = usuario.id;
        botonActivar.textContent = 'Activar';
        celdaAcciones.appendChild(botonActivar);
        // Agrega el botón para desactivar la cuenta del usuario
        const botonDesactivar = document.createElement('button');
        botonDesactivar.classList.add('btn', 'btn-desactivar');
        botonDesactivar.dataset.usuarioId = usuario.id;
        botonDesactivar.textContent = 'Desactivar';
        celdaAcciones.appendChild(botonDesactivar);
      });
    } else {
      // Mostrar mensaje de error
      alert("Error al obtener la lista de usuarios.");
    }
  };
  xhr.send("accion=obtenerUsuarios");
}

// Agrega un evento de clic a cada enlace de la barra de navegación
const navLinks = document.querySelectorAll('#nav a');
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

// Cargar la lista de usuarios al cargar la página
window.onload = () => {
  actualizarTablaUsuarios(); // Llama a la función para actualizar la tabla
  actualizarTablaDepositos(); // Llama a la función para actualizar la tabla de depósitos
};