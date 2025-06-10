
// Este script escucha las teclas 'a' y 'z' para incrementar y decrementar un contador
let counter = 0;
let counterVisita = 0;

document.addEventListener('keydown', function (event) {
    if (event.key === 'a' || event.key === 'A') {
        counter++;
        updateDisplay();
    } else if (event.key === 'z' || event.key === 'Z') {
        if (counter > 0) {
            counter--;
            updateDisplay();
        }
    } else if (event.key === 'd' || event.key === 'D') {
        counterVisita++;
        updateDisplay();
    } else if (event.key === 'c' || event.key === 'C') {
        if (counterVisita > 0) {
            counterVisita--;
            updateDisplay();
        }
    }
});

function updateDisplay() {
    const golesLocal = document.getElementById('goles_local');
    const golesVisita = document.getElementById('goles_visita');
    if (golesLocal) golesLocal.textContent = counter;
    if (golesVisita) golesVisita.textContent = counterVisita;
}

// PERIODO SUMA Y RESTA
let periodo = 0;

document.addEventListener('keydown', function (event) {
    if (event.key === 'p' || event.key === 'P') {
        if (periodo < 2) {
            periodo++;
            updatePeriodoDisplay();
        }
    } else if (event.key === 'o' || event.key === 'O') {
        if (periodo > 1) {
            periodo--;
            updatePeriodoDisplay();
        }
    }
});

function updatePeriodoDisplay() {
    const periodoDisplay = document.getElementById('periodo');
    if (periodoDisplay) periodoDisplay.textContent = periodo;
}

// FUULLSCREEN
document.getElementById('fullscreen-btn').addEventListener('click', function () {
    const elem = document.getElementById('master');
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { // Safari
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE11
        elem.msRequestFullscreen();
    }
});

// CRONOMETRO
let tiempoRestante = 25 * 60; // 25 minutos en segundos
let cronometroActivo = false;
let intervaloCronometro = null;

function actualizarCronometro() {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    const cronometro = document.getElementById('cronometro');
    if (cronometro) {
        cronometro.textContent = 
            `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    }
}

function iniciarPausarCronometro() {
    if (cronometroActivo) {
        clearInterval(intervaloCronometro);
        cronometroActivo = false;
    } else {
        cronometroActivo = true;
        intervaloCronometro = setInterval(() => {
            if (tiempoRestante > 0) {
                tiempoRestante--;
                actualizarCronometro();
            } else {
                clearInterval(intervaloCronometro);
                cronometroActivo = false;
            }
        }, 1000);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        iniciarPausarCronometro();
        event.preventDefault();
    }
});

// Inicializa el cronómetro al cargar la página
actualizarCronometro();
document.getElementById('input-logo-local').addEventListener('change', function(event) {
    const img = document.getElementById('logo-local');
    const file = event.target.files[0];
    if (file) {
        img.src = URL.createObjectURL(file);
    }
});

document.getElementById('input-logo-visitante').addEventListener('change', function(event) {
    const img = document.getElementById('logo-visitante');
    const file = event.target.files[0];
    if (file) {
        img.src = URL.createObjectURL(file);
    }
});

// Permite editar los nombres de los equipos al hacer clic
document.querySelectorAll('.equipos_fuente1').forEach(function(element) {
    element.addEventListener('keydown', function(e) {
        // Evita que otras funciones escuchen teclas mientras se edita
        e.stopPropagation();
        // Si se presiona Enter, salir de la edición
        if (e.key === 'Enter') {
            e.preventDefault();
            element.blur();
        }
    });
});
document.addEventListener('keydown', function(event) {
    // Reiniciar reloj con "r"
    if ((event.key === 'r' || event.key === 'R') && !document.activeElement.isContentEditable) {
        if (confirm('¿Seguro que quieres reiniciar el reloj a 25 minutos?')) {
            tiempoRestante = 25 * 60;
            actualizarCronometro();
        }
    }
    // Nuevo partido con "y"
    if ((event.key === 'y' || event.key === 'Y') && !document.activeElement.isContentEditable) {
        if (confirm('¿Seguro que quieres iniciar un nuevo partido? Se reiniciarán los goles, periodo y reloj.')) {
            // Reinicia goles
            counter = 0;
            counterVisita = 0;
            updateDisplay();
            // Reinicia periodo
            periodo = 1;
            updatePeriodoDisplay();
            // Reinicia reloj
            tiempoRestante = 25 * 60;
            actualizarCronometro();
        }
    }
});