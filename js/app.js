// Seleccionar elementos del DOM
let nave = document.querySelector('.nave'); // La nave espacial
let body = document.querySelector('body'); // El cuerpo de la página
let laser = document.getElementById('laser'); // El sonido de disparo
let explosion = document.getElementById('explosion'); // El sonido de explosión
let live = document.querySelector('i'); // El número de vidas restantes
let times = document.getElementById('times'); // El temporizador
let lives = 5; // Número inicial de vidas
let second = 60; // Duración del juego en segundos

// Contador regresivo de 60 segundos
setInterval(() => {
    second--; // Disminuir el contador en 1 cada segundo
    times.textContent = second; // Mostrar el contador en la página
    if (second == 0) { // Cuando el contador llega a 0
        alert('You Win!'); // Mostrar un mensaje de victoria
        location.reload(); // Recargar la página
    }
}, 1000);

// Evento de movimiento del mouse para mover la nave
document.addEventListener('mousemove', (e) => {
    nave.style.left = (e.clientX - 40) + 'px'; // Mover la nave siguiendo el cursor del mouse
});

// Evento de clic para generar un disparo
document.addEventListener('click', () => {
    let bala = document.createElement('div'); // Crear un nuevo elemento "bala"
    bala.classList.add('bala'); // Agregar la clase "bala" al nuevo elemento
    bala.style.bottom = 70 + 'px'; // Establecer la posición vertical inicial de la bala
    bala.style.left = (nave.getBoundingClientRect().left + 40) + 'px'; // Establecer la posición horizontal inicial de la bala
    body.append(bala); // Agregar la bala al cuerpo de la página
    laser.play(); // Reproducir el sonido de disparo
});
//Intervalo para mover los disparos y detectar colisiones
setInterval(() => {
    let balas = document.querySelectorAll('.bala'); // Seleccionar todas las balas
    balas.forEach(bala => { // Para cada bala
        bala.style.top = (bala.getBoundingClientRect().top - 20) + 'px'; // Mover la bala hacia arriba

        if (bala.getBoundingClientRect().top <= 0) { // Si la bala sale de la pantalla
            bala.remove(); // Eliminar la bala
        }

        // Detectar colisiones con enemigos
        let enemigos = document.querySelectorAll('.enemigo');

        enemigos.forEach(enemigo => {
            if (bala.getBoundingClientRect().top <= enemigo.getBoundingClientRect().top + 50) {
                if (bala.getBoundingClientRect().left >= enemigo.getBoundingClientRect().left && bala.getBoundingClientRect().left <= enemigo.getBoundingClientRect().left + 80) {
                    enemigo.style.backgroundImage = 'url("img/explosion.png")'; // Cambiar la imagen de fondo del enemigo para mostrar una explosión
                    explosion.play(); // Reproducir el sonido de explosión
                    setTimeout(() => {
                        enemigo.remove(); // Eliminar el enemigo después de 100 ms
                        explosion.stop(); // Detener el sonido de explosión
                    }, 100);
                }
            }
        });
    });
}, 100);

// Intervalo para generar meteoritos
let aparecer = 0;
setInterval(() => {
    aparecer++;
    if (aparecer % 10 == 0) {
        let enemigo = document.createElement('div');
        enemigo.classList.add('enemigo');
        body.append(enemigo);
        enemigo.style.left = (Math.random() * window.innerWidth - 100) + 'px';
    }
    let enemigos = document.querySelectorAll('.enemigo');
    enemigos.forEach(element => {
        element.style.top = (element.getBoundingClientRect().top + 10) + 'px';
        if (element.getBoundingClientRect().top > nave.getBoundingClientRect().top) {
            lives--;
            live.textContent = lives;
            if (lives == -1) {
                alert('Game Over');
                location.reload();
            }
            element.remove();
        }
    });
}, 100);
