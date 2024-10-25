// Selecciona el contenedor de la red del usuario
const redUsuario = document.getElementById('red-usuario');

// Función para cargar la red del usuario
function cargarRedUsuario(usuarioId) {
    // Realizar la solicitud AJAX para obtener la red del usuario
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "red.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-formurlencoded");
    xhr.onload = function() {
        if (this.status === 200) {
            // Mostrar la red del usuario en el contenedor
            const red = JSON.parse(this.responseText);

            // Mostrar el enlace de referido del usuario
            const enlaceReferido = document.createElement('div');
            enlaceReferido.classList.add('enlace-referido');
            enlaceReferido.textContent = red.usuario.enlace_referido;
            redUsuario.appendChild(enlaceReferido);

            // Mostrar el nodo del usuario actual
            const nodoUsuario = document.createElement('div');
            nodoUsuario.classList.add('node', 'pink');
            nodoUsuario.dataset.usuarioId = usuarioId;
            nodoUsuario.textContent = red.usuario.nickname + '\nNivel ' + red.usuario.nivel;
            redUsuario.appendChild(nodoUsuario);

            // Mostrar los nodos de los directos
            if (red.directos.length > 0) {
                const nivelDirectos = document.createElement('div');
                nivelDirectos.classList.add('level');
                redUsuario.appendChild(nivelDirectos);

                red.directos.forEach(directo => {
                    const nodoDirecto = document.createElement('div');
                    nodoDirecto.classList.add('node', 'blue');
                    nodoDirecto.dataset.usuarioId = directo.id;
                    nodoDirecto.textContent = directo.nickname + '\nNivel ' + directo.nivel;
                    nivelDirectos.appendChild(nodoDirecto);

                    // Agregar el evento de clic para mostrar la red del directo
                    nodoDirecto.addEventListener('click', () => {
                        cargarRedUsuario(directo.id);
                    });
                });
            }

            // Mostrar los nodos de los indirectos
            if (red.indirectos.length > 0) {
                const nivelIndirectos = document.createElement('div');
                nivelIndirectos.classList.add('level');
                redUsuario.appendChild(nivelIndirectos);

                red.indirectos.forEach(indirecto => {
                    const nodoIndirecto = document.createElement('div');
                    nodoIndirecto.classList.add('node', 'orange');
                    nodoIndirecto.dataset.usuarioId = indirecto.id;
                    nodoIndirecto.textContent = indirecto.nickname + '\nNivel ' + indirecto.nivel;
                    nivelIndirectos.appendChild(nodoIndirecto);

                    // Agregar el evento de clic para mostrar la red del indirecto
                    nodoIndirecto.addEventListener('click', () => {
                        cargarRedUsuario(indirecto.id);
                    });
                });
            }

            // Agregar las líneas de la pirámide
            const line2 = document.createElement('div');
            line2.classList.add('line2', 'vertical2');
            redUsuario.appendChild(line2);

            const line3 = document.createElement('div');
            line3.classList.add('line3', 'vertical3');
            redUsuario.appendChild(line3);

            const lineHorizontal = document.createElement('div');
            lineHorizontal.classList.add('line', 'horizontal');
            redUsuario.appendChild(lineHorizontal);
        } else {
            // Mostrar mensaje de error
            alert("Error al obtener la red del usuario.");
        }
    };
    xhr.send("accion=obtenerRed&usuarioId=" + usuarioId);
}

// Cargar la red del usuario actual al cargar la página
window.onload = () => {
    const usuarioId = redUsuario.dataset.usuarioId;
    cargarRedUsuario(usuarioId);
};

// Agregar eventos de clic a los enlaces de referido
redUsuario.addEventListener('click', (event) => {
    if (event.target.classList.contains('enlace-referido')) {
        const usuarioId = event.target.dataset.usuarioId;
        cargarRedUsuario(usuarioId);
    }
});