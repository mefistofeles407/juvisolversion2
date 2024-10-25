// Selecciona la barra de navegación
const nav = document.getElementById('nav');

// Selecciona los enlaces de la barra de navegación
const navLinks = nav.querySelectorAll('a');

// Agrega un evento de clic a cada enlace de la barra de navegación
navLinks.forEach(link => {
link.addEventListener('click', () => {
// Elimina la clase "active" de todos los enlaces
navLinks.forEach(l => l.classList.remove('active'));

// Agrega la clase "active" al enlace actual
link.classList.add('active');
});
});