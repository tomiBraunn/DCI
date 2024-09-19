let tipoUsuario = '';

// Función para desplazar a la siguiente página
function desplazarALaPagina(paginaId) {
    document.querySelector('.scroll-container').scrollTo({
        left: document.getElementById(paginaId).offsetLeft,
        behavior: 'smooth'
    });
}

// Botón de inicio en la primera página
document.getElementById('btn_inicio').addEventListener('click', function(event) {
    event.preventDefault();
    desplazarALaPagina('pagina2');
});

// Definir qué inputs son necesarios según el tipo de usuario
function establecerTipoUsuario(tipo) {
    tipoUsuario = tipo;
    document.getElementById('tipousuario').textContent = tipo;
    
    document.getElementById('DNIusuario').style.display = 'none';
    document.getElementById('NyAusuario').style.display = 'none';
    document.getElementById('Claveadmin').style.display = 'none';
    document.getElementById('curso_usuario').style.display = 'none';

    if (tipo === 'Alumno/a' || tipo === 'Profesor/a') {
        document.getElementById('DNIusuario').style.display = 'block';
    } else if (tipo === 'Invitado/a') {
        document.getElementById('DNIusuario').style.display = 'block';
        document.getElementById('curso_usuario').style.display = 'flex';
        document.getElementById('NyAusuario').style.display = 'block';
    } else if (tipo === 'Admin') {
        document.getElementById('DNIusuario').style.display = 'block';
        document.getElementById('Claveadmin').style.display = 'block';
    }

    desplazarALaPagina('pagina3');
}

// Definir el tipo de usuario
document.getElementById('alumno').addEventListener('click', () => establecerTipoUsuario('Alumno/a'));
document.getElementById('profesor').addEventListener('click', () => establecerTipoUsuario('Profesor/a'));
document.getElementById('invitado').addEventListener('click', () => establecerTipoUsuario('Invitado/a'));
document.getElementById('admin').addEventListener('click', () => establecerTipoUsuario('Admin'));

// Botón de avanzar una vez que se ingresaron los datos
document.getElementById('avanzar').addEventListener('click', function(event) {
    event.preventDefault();

    // Validar inputs según el tipo de usuario
    let valid = true;
    const dni = document.getElementById('DNIusuario').value;
    const nombreApellido = document.getElementById('NyAusuario').value;
    const claveAdmin = document.getElementById('Claveadmin').value;
    const curso = document.getElementById('curso_usuario');
    const division = document.getElementById('division');
    const especialidad = document.getElementById('especialidad');
    const botonAvanzar = document.getElementById('avanzar');


    if (tipoUsuario === 'Alumno/a' || tipoUsuario === 'Profesor/a') {
        if (!dni) valid = false;
    } else if (tipoUsuario === 'Invitado/a') {
        if (!dni || !nombreApellido || curso.selectedIndex === 0 || division.selectedIndex === 0 || especialidad.selectedIndex === 0) valid = false;
    } else if (tipoUsuario === 'Admin') {
        if (!dni || !claveAdmin) valid = false;
    }

    if (valid) {
        desplazarALaPagina('pagina4');
    } else {
        // alert('Por favor, completa todos los campos necesarios.');

        if (botonAvanzar.classList.contains("shake")) {
            botonAvanzar.classList.remove('shake');
        }
        botonAvanzar.classList.add('shake');

        // Quitar la clase 'shake' después de 
        setTimeout(() => {
            botonAvanzar.classList.remove('shake');
        }, 2000);
    }
});

// Funcionalidad del botón de desbloqueo facial o con huella digital
document.getElementById('pulgar').addEventListener('click', function(event) {
    event.preventDefault();

    // Desplazar a la página 6 si el tipo de usuario es Administrador, sino a la página 5
    if (tipoUsuario === 'Admin') {
        document.getElementById('pagina5').style.display = 'none';
        document.getElementById('opcionesnorm').style.display = 'none';
        document.getElementById('opcionesadmin').style.display = 'block';
        desplazarALaPagina('pagina6');
    } else {
        desplazarALaPagina('pagina5');
        document.getElementById('opcionesadmin').style.display = 'none';
    }
});

// Volver a la página anterior si falla la autenticación
document.getElementById('volver_a_intentar').addEventListener('click', function(event) {
    event.preventDefault();
    desplazarALaPagina('pagina4');
});

// Retirar o devolver computadora en la última página u opciones de admin
document.getElementById('retirar').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('devolver_compu').style.display = 'none';
    desplazarALaPagina('pagina6');
});

document.getElementById('devolver').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('retirar_compu').style.display = 'none';
    desplazarALaPagina('pagina6');
});

// Botón reinicio
document.getElementById('reiniciar').addEventListener('click', function(event) {
    event.preventDefault();
    location.reload();
});

// Botones home
document.querySelectorAll('.home').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        location.reload();
    });
});

// Botones back
document.getElementById('back2').addEventListener('click', function(event) {
    event.preventDefault();
    desplazarALaPagina('pagina1');
});

document.getElementById('back3').addEventListener('click', function(event) {
    event.preventDefault();
    desplazarALaPagina('pagina2');
});

document.getElementById('back4').addEventListener('click', function(event) {
    event.preventDefault();
    desplazarALaPagina('pagina3');
});

document.getElementById('back5').addEventListener('click', function(event) {
    event.preventDefault();
    desplazarALaPagina('pagina4');
});

// Botón reinicio página admin 
document.getElementById('opcionesadmin_reiniciar').addEventListener('click', function(event) {
    event.preventDefault();
    location.reload();
});