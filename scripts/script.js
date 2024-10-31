const version = "v.1.00";
let tipoUsuario = "";

// Función para desplazar a la siguiente página
function desplazarALaPagina(paginaId) {
    document.querySelector(".scroll-container").scrollTo({
        left: document.getElementById(paginaId).offsetLeft,
        behavior: "smooth",
    });

    // Verifica si estamos en la página 2
    if (paginaId === "pagina2" || paginaId === "pagina5") {
        const adjustmentLayer = document.getElementById("adjustmentLayer");

        // Elimina todas las clases excepto "adjustmentLayer"
        adjustmentLayer.className = "adjustmentLayer";
    }
}

// Botón de inicio en la primera página
document
    .getElementById("btn_inicio")
    .addEventListener("click", function (event) {
        event.preventDefault();
        desplazarALaPagina("pagina2");
    });

// Abrir menú de ayuda cuando se da clic al botón de info
document.getElementById("btn_info_dci").addEventListener("click", function () {
    document.getElementById("info_dci").style.display = "flex";
    document.getElementById("info_dci").classList.remove("opacidad_blur_fade");
    document.getElementById("btn_info_dci").style.display = "none";
    document.getElementById("btn_inicio").style.display = "none";
    document.querySelector("h1").style.display = "none";
});

// Cerrar menú de ayuda cuando se da clic al botón de cerrar
document.getElementById("back_info").addEventListener("click", function () {
    document.getElementById("info_dci").classList.add("opacidad_blur_fade");
    document.getElementById("btn_info_dci").style.display = "flex";
    document.getElementById("btn_inicio").style.display = "block";
    document.querySelector("h1").style.display = "block";
    document.querySelector("h1").classList.remove("entrada");
    document.querySelector("h1").classList.add("entrada");
    setTimeout(() => {
        document.querySelector("h1").classList.remove("entrada");
    }, 1100);
});

// Definir el tipo de usuario
document
    .getElementById("alumno")
    .addEventListener("click", () => establecerTipoUsuario("Alumno/a"));
document
    .getElementById("profesor")
    .addEventListener("click", () => establecerTipoUsuario("Profesor/a"));
document
    .getElementById("invitado")
    .addEventListener("click", () => establecerTipoUsuario("Invitado/a"));

function establecerTipoUsuario(tipo) {
    tipoUsuario = tipo;
    document.getElementById("mostarTipoUsuario").textContent = tipo;

    // Ocultar campos inicialmente
    document.getElementById("DNIusuario").style.display = "none";
    document.getElementById("NyAusuario").style.display = "none";
    document.getElementById("curso_usuario").style.display = "none";
    document.getElementById("DNIusuario").value = "";

    // Mostrar inputs segun el tipo de usuario y agregar el adjustment layer
    if (tipo === "Alumno/a") {
        document.getElementById("DNIusuario").style.display = "block";
        document
            .getElementById("adjustmentLayer")
            .classList.add("adjustmentLayerAlumno");
    } else if (tipo === "Profesor/a") {
        document.getElementById("DNIusuario").style.display = "block";
        document
            .getElementById("adjustmentLayer")
            .classList.add("adjustmentLayerProfe");
    } else if (tipo === "Invitado/a") {
        document.getElementById("DNIusuario").style.display = "block";
        document.getElementById("curso_usuario").style.display = "flex";
        document.getElementById("NyAusuario").style.display = "block";
        document
            .getElementById("adjustmentLayer")
            .classList.add("adjustmentLayerInvitado");
    }

    desplazarALaPagina("pagina3");
}

var dni;
// Botón de avanzar una vez que se ingresaron los datos
document
    .getElementById("btn_avanzar")
    .addEventListener("click", function (event) {
        event.preventDefault();

        let valid = true;
        dni = document.getElementById("DNIusuario").value.trim();
        const nombreApellido = document
            .getElementById("NyAusuario")
            .value.trim();
        const botonAvanzar = document.getElementById("btn_avanzar");

        document
            .querySelectorAll(".incompleto")
            .forEach((el) => el.classList.remove("incompleto"));

        // Validación según tipo de usuario
        if (tipoUsuario === "Alumno/a" || tipoUsuario === "Profesor/a") {
            if (!dni) {
                valid = false;
                document
                    .getElementById("DNIusuario")
                    .classList.add("incompleto");
            }
        } else if (tipoUsuario === "Invitado/a") {
            if (!dni) {
                valid = false;
                document
                    .getElementById("DNIusuario")
                    .classList.add("incompleto");
            }
            if (!nombreApellido) {
                valid = false;
                document
                    .getElementById("NyAusuario")
                    .classList.add("incompleto");
            }
        }

        // Manejo de avance o error
        if (valid) {
            if (dni != "") {
                console.log(dni);

                // Mandar los datos al backend solo si la condición se cumple
                postData("getNombre", { dni: dni }, (nombre) => {
                    if (!nombre) {
                        document
                            .getElementById("DNIusuario")
                            .classList.add("incompleto");
                    } else {
                        console.log(nombre);
                        document.getElementById("nombre").textContent = nombre;
                        desplazarALaPagina("pagina4");
                    }
                });
            } else {
                console.log("Faltan datos o tipo de usuario no válido");
            }
        } else {
            // Agregar clase shake si los datos no son válidos
            if (botonAvanzar.classList.contains("shake")) {
                botonAvanzar.classList.remove("shake");
            }
            botonAvanzar.classList.add("shake");

            setTimeout(() => {
                botonAvanzar.classList.remove("shake");
            }, 500);
        }
    });

// Volver a intentar si la cara no coincide
document
    .getElementById("volver_a_intentar")
    .addEventListener("click", function (event) {
        event.preventDefault();
        desplazarALaPagina("pagina4");
    });

var cantidadCompus;

fetchData("cantidadCompus", (data) => {
    cantidadCompus = data;
    document.getElementById("cantidad_compus").innerHTML = data;
});

// Función para actualizar la disponibilidad de los botones
function actualizarDisponibilidad() {
    const botonRetirar = document.getElementById("retirar");
    const botonDevolver = document.getElementById("devolver");

    // Deshabilitar "Devolver computadora" si cantidadCompus es 2
    if (cantidadCompus >= 2) {
        botonDevolver.classList.add("noDisponible");
    } else {
        botonDevolver.classList.remove("noDisponible");
    }

    // Deshabilitar "Retirar computadora" si cantidadCompus es 0
    if (cantidadCompus <= 0) {
        botonRetirar.classList.add("noDisponible");
    } else {
        botonRetirar.classList.remove("noDisponible");
    }

    // postData(actualizarCantidadCompus,

    // )
}
document.addEventListener("DOMContentLoaded", actualizarDisponibilidad);

// Retirar computadora
document.getElementById("retirar").addEventListener("click", function (event) {
    const botonRetirar = document.getElementById("retirar");

    if (botonRetirar.classList.contains("noDisponible")) {
        event.preventDefault();
        botonRetirar.classList.add("shake");
        setTimeout(() => {
            botonRetirar.classList.remove("shake");
        }, 500);

        return;
    }

    // Resta uno a cantidadCompus y actualiza la disponibilidad
    cantidadCompus--;
    actualizarDisponibilidad();

    event.preventDefault();
    document.getElementById("devolver_compu").style.display = "none";
    desplazarALaPagina("pagina6");
});

// Devolver computadora
document.getElementById("devolver").addEventListener("click", function (event) {
    const botonDevolver = document.getElementById("devolver");

    if (botonDevolver.classList.contains("noDisponible")) {
        event.preventDefault();
        botonDevolver.classList.add("shake");
        setTimeout(() => {
            botonDevolver.classList.remove("shake");
        }, 500);

        return;
    }

    // Suma uno a cantidadCompus y actualiza la disponibilidad
    cantidadCompus++;
    actualizarDisponibilidad();

    event.preventDefault();
    document.getElementById("retirar_compu").style.display = "none";
    desplazarALaPagina("pagina6");
});

// Función para reiniciar
function reiniciarEstado() {
    // Seleccionar todas las pantallas y ocultarlas
    const pantallas = document.querySelectorAll(".pantalla");
    pantallas.forEach((pantalla) => {
        pantalla.style.display = "none";
    });

    // Seleccionar todas las páginas y botones con clase 'home'
    const paginas = document.querySelectorAll(".pagina");
    const botonesHome = document.querySelectorAll(".home");

    // Ocultar todas las páginas
    paginas.forEach((pagina) => {
        pagina.style.display = "none"; // Ocultar todas las páginas
    });

    // Ocultar todos los botones con clase 'home'
    botonesHome.forEach((boton) => {
        boton.style.display = "none";
    });

    // Desplazar a la página 1
    desplazarALaPagina("pagina1");

    setTimeout(() => {
        paginas.forEach((pagina) => {
            pagina.style.display = "flex";
        });

        botonesHome.forEach((boton) => {
            boton.style.display = "flex";
        });
    }, 300);

    // Limpiar todos los inputs
    document.querySelectorAll("input").forEach((input) => {
        input.value = "";
    });

    tipoUsuario = "";
    document.getElementById("mostarTipoUsuario").textContent = "";

    // Reiniciar el estado de varios elementos
    document.getElementById("DNIusuario").style.display = "none";
    document.getElementById("NyAusuario").style.display = "none";
    document.getElementById("curso_usuario").style.display = "none";
    document.getElementById("opcionesadmin").style.display = "none";
    document.getElementById("usuarioNOverificado_pagina5").style.display =
        "flex";
    document.getElementById("usuarioverificado_pagina5").style.display = "flex";
    document.getElementById("retirar_compu").style.display = "flex";
    document.getElementById("devolver_compu").style.display = "flex";
    document.getElementById("info_dci").style.display = "none";
    document.getElementById("info_dci").classList.add("opacidad_blur_fade");
    document.getElementById("creditos").style.display = "none";
    document.getElementById("creditos").classList.add("opacidad_blur_fade");
    adjustmentLayer.className = "adjustmentLayer";
    document.querySelector("h1").classList.remove("entrada");
    document.querySelector("h1").classList.add("entrada");
    setTimeout(() => {
        document.querySelector("h1").classList.remove("entrada");
    }, 1100);
}

// Botón reiniciar de la última página
document
    .getElementById("reiniciar")
    .addEventListener("click", function (event) {
        event.preventDefault();
        reiniciarEstado();
    });

// Botones home
document.querySelectorAll(".home").forEach((botonHome) => {
    botonHome.addEventListener("click", function (event) {
        event.preventDefault();
        reiniciarEstado();
    });
});

// Botones back
["back2", "back3", "back4"].forEach((id, index) => {
    document.getElementById(id).addEventListener("click", (event) => {
        event.preventDefault();
        desplazarALaPagina(`pagina${index + 1}`);
    });
});

// Botón reiniciar página admin
document
    .getElementById("opcionesadmin_reiniciar")
    .addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });
