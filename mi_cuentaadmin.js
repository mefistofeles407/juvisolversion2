// Selecciona la tabla de usuarios
const tablaUsuarios = document.getElementById('tablaUsuarios');
// Selecciona la sección del usuario
const seccionUsuario = document.getElementById('usuario');
// Selecciona el formulario del usuario
const formUsuario = document.getElementById('formUsuario');
// Selecciona el botón de editar
const btnEditar = document.getElementById('btnEditar');
// Selecciona el botón de guardar
const btnGuardar = document.getElementById('btnGuardar');
// Selecciona el botón de cancelar
const btnCancelar = document.getElementById('btnCancelar');

// Función para obtener la lista de usuarios
function obtenerUsuarios() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "mi_cuentaadmin.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-formurlencoded");
    xhr.onload = function() {
        if (this.status === 200) {
            const usuarios = JSON.parse(this.responseText);
            mostrarUsuarios(usuarios);
        } else {
            alert("Error al obtener la lista de usuarios.");
        }
    };
    xhr.send("accion=obtenerUsuarios");
}

// Función para mostrar la lista de usuarios en la tabla
function mostrarUsuarios(usuarios) {
    tablaUsuarios.innerHTML = ''; // Limpia la tabla
    const thead = tablaUsuarios.createTHead();
    const row = thead.insertRow();
    const idCell = row.insertCell();
    const nombreCell = row.insertCell();
    const apellidoCell = row.insertCell();
    const correoCell = row.insertCell();
    const accionesCell = row.insertCell();
    idCell.textContent = 'ID';
    nombreCell.textContent = 'Nombre';
    apellidoCell.textContent = 'Apellido';
    correoCell.textContent = 'Correo';
    accionesCell.textContent = 'Acciones';
    usuarios.forEach(usuario => {
        const fila = tablaUsuarios.insertRow();
        const celdald = fila.insertCell();
        const celdaNombre = fila.insertCell();
        const celdaApellido = fila.insertCell();
        const celdaCorreo = fila.insertCell();
        const celdaAcciones = fila.insertCell();
        celdald.textContent = usuario.id;
        celdaNombre.textContent = usuario.nombre;
        celdaApellido.textContent = usuario.apellido;
        celdaCorreo.textContent = usuario.correo;
        const enlaceDatos = document.createElement('a');
        enlaceDatos.href = '#';
        enlaceDatos.textContent = 'Ver datos';
        enlaceDatos.dataset.usuarioId = usuario.id;
        celdaAcciones.appendChild(enlaceDatos);
    });
    // Agrega un evento de clic a cada fila de la tabla
    tablaUsuarios.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            const usuarioId = event.target.dataset.usuarioId;
            mostrarDatosUsuario(usuarioId);
        }
    });
}

// Función para obtener los datos de un usuario específico
function mostrarDatosUsuario(usuarioId) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "mi_cuentaadmin.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-formurlencoded");
    xhr.onload = function() {
        if (this.status === 200) {
            const usuario = JSON.parse(this.responseText);
            cargarDatosUsuario(usuario);
        } else {
            alert("Error al obtener los datos del usuario.");
        }
    };
    xhr.send(`accion=obtenerUsuario&usuarioId=${usuarioId}`);
}

// Función para cargar los datos del usuario en el formulario
function cargarDatosUsuario(usuario) {
    seccionUsuario.style.display = 'block'; // Mostrar la sección del usuario
    seccionUsuarios.style.display = 'none'; // Ocultar la sección de la lista de usuarios
    formUsuario.reset(); // Resetear el formulario
    document.getElementById('usuarioId').value = usuario.id;
    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('apellido').value = usuario.apellido;
    document.getElementById('correo').value = usuario.correo;
    document.getElementById('cuentaSoles').value = usuario.cuenta_soles;
    document.getElementById('telefono').value = usuario.telefono;
    document.getElementById('nickname').value = usuario.nickname;
    document.getElementById('nivel').value = usuario.nivel;
    document.getElementById('estado').value = usuario.estado;
    document.getElementById('contraseña').value = usuario.contraseña;
    document.getElementById('preguntaSecreta').value = usuario.pregunta_secreta;
}

// Función para habilitar la edición del formulario
function editarUsuario() {
    document.getElementById('nombre').readOnly = false;
    document.getElementById('apellido').readOnly = false;
    document.getElementById('correo').readOnly = false;
    document.getElementById('cuentaSoles').readOnly = false;
    document.getElementById('telefono').readOnly = false;
    document.getElementById('nickname').readOnly = false;
    document.getElementById('nivel').readOnly = false;
    document.getElementById('estado').disabled = false;
    document.getElementById('contraseña').readOnly = false;
    document.getElementById('preguntaSecreta').readOnly = false;
    btnEditar.style.display = 'none';
    btnGuardar.style.display = 'block';
    btnCancelar.style.display = 'block';
}

// Función para guardar los cambios del usuario
function guardarUsuario() {
    const usuarioId = document.getElementById('usuarioId').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const cuentaSoles = document.getElementById('cuentaSoles').value;
    const telefono = document.getElementById('telefono').value;
    const nickname = document.getElementById('nickname').value;
    const nivel = document.getElementById('nivel').value;
    const estado = document.getElementById('estado').value;
    const contraseña = document.getElementById('contraseña').value;
    const preguntaSecreta = document.getElementById('preguntaSecreta').value;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "mi_cuentaadmin.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-formurlencoded");
    xhr.onload = function() {
        if (this.status === 200) {
            obtenerUsuarios(); // Actualizar la tabla de usuarios
            seccionUsuario.style.display = 'none'; // Ocultar la sección del usuario
            seccionUsuarios.style.display = 'block'; // Mostrar la sección de la lista de usuarios
            alert("Datos del usuario actualizados correctamente.");
        } else {
            alert("Error al actualizar los datos del usuario.");
        }
    };
    xhr.send(`accion=guardarUsuario&usuarioId=${usuarioId}&nombre=${nombre}&apellido=${apellido}&correo=${correo}&cuentaSoles=${cuentaSoles}&telefono=${telefono}&nickname=${nickname}&nivel=${nivel}&estado=${estado}&contraseña=${contraseña}&preguntaSecreta=${preguntaSecreta}`);
}

// Función para cancelar la edición
function cancelarEdicion() {
    document.getElementById('nombre').readOnly = true;
    document.getElementById('apellido').readOnly = true;
    document.getElementById('correo').readOnly = true;
    document.getElementById('cuentaSoles').readOnly = true;
    document.getElementById('telefono').readOnly = true;
    document.getElementById('nickname').readOnly = true;
    document.getElementById('nivel').readOnly = true;
    document.getElementById('estado').disabled = true;
    document.getElementById('contraseña').readOnly = true;
    document.getElementById('preguntaSecreta').readOnly = true;
    btnEditar.style.display = 'block';
    btnGuardar.style.display = 'none';
    btnCancelar.style.display = 'none';
}

// Cargar la lista de usuarios al cargar la página
window.onload = () => {
    obtenerUsuarios();
};