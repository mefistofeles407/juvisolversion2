const registrarButton = document.getElementById('registrar');
const accederButton = document.getElementById('acceder');

registrarButton.addEventListener('click', () => {
    window.location.href = 'registro.html';
});

accederButton.addEventListener('click', () => {
    window.location.href = 'login.html';
});