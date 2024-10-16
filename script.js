let tipoUsuario = "";

// Función para desplazar a la siguiente página
function desplazarALaPagina(paginaId) {
    document.querySelector(".scroll-container").scrollTo({
        left: document.getElementById(paginaId).offsetLeft,
        behavior: "smooth",
    });
}

// Botón de inicio en la primera página
document.getElementById("btn_inicio").addEventListener("click", function (event) {
    event.preventDefault();
    desplazarALaPagina("pagina2");
});

// Abrir menú de ayuda cuando se da clic al botón de info
document.getElementById("btn_info_dci").addEventListener("click", function () {
    document.getElementById("info_dci").style.display = "flex";
    document.getElementById("info_dci").classList.remove("opacidad_blur_fade");
    document.getElementById("btn_info_dci").style.display = "none";
    document.querySelector("h1").style.display = "none";
    document.getElementById("btn_inicio").style.display = "none";
});

// Cerrar menú de ayuda cuando se da clic al botón de cerrar
document.getElementById("back_info").addEventListener("click", function () {
    document.getElementById("info_dci").classList.add("opacidad_blur_fade");
    document.getElementById("btn_info_dci").style.display = "flex";
    document.querySelector("h1").style.display = "block";
    document.getElementById("btn_inicio").style.display = "block";
});

// Definir el tipo de usuario
document.getElementById("alumno").addEventListener("click", () => establecerTipoUsuario("Alumno/a"));
document.getElementById("profesor").addEventListener("click", () => establecerTipoUsuario("Profesor/a"));
document.getElementById("invitado").addEventListener("click", () => establecerTipoUsuario("Invitado/a"));
document.getElementById("admin").addEventListener("click", () => establecerTipoUsuario("Admin"));

function establecerTipoUsuario(tipo) {
    tipoUsuario = tipo;
    document.getElementById("tipousuario").textContent = tipo;

    // Ocultar campos inicialmente
    document.getElementById("DNIusuario").style.display = "none";
    document.getElementById("NyAusuario").style.display = "none";
    document.getElementById("Claveadmin").style.display = "none";
    document.getElementById("curso_usuario").style.display = "none";

    // Mostrar campos según el tipo de usuario
    if (tipo === "Alumno/a" || tipo === "Profesor/a") {
        document.getElementById("DNIusuario").style.display = "block";
    } else if (tipo === "Invitado/a") {
        document.getElementById("DNIusuario").style.display = "block";
        document.getElementById("curso_usuario").style.display = "flex";
        document.getElementById("NyAusuario").style.display = "block";
    } else if (tipo === "Admin") {
        document.getElementById("DNIusuario").style.display = "block";
        document.getElementById("Claveadmin").style.display = "block";
        document.getElementById("opcionesadmin").style.display = "flex";
    }

    desplazarALaPagina("pagina3");
}

// Botón de avanzar una vez que se ingresaron los datos
document.getElementById("btn_avanzar").addEventListener("click", function (event) {
    event.preventDefault();

    let valid = true;
    const dni = document.getElementById("DNIusuario").value.trim();
    const nombreApellido = document.getElementById("NyAusuario").value.trim();
    const claveAdmin = document.getElementById("Claveadmin").value.trim();
    const botonAvanzar = document.getElementById("btn_avanzar");

    document.querySelectorAll(".incompleto").forEach((el) => el.classList.remove("incompleto"));

    // Validación según tipo de usuario
    if (tipoUsuario === "Alumno/a" || tipoUsuario === "Profesor/a") {
        if (!dni) {
            valid = false;
            document.getElementById("DNIusuario").classList.add("incompleto");
        }
    } else if (tipoUsuario === "Invitado/a") {
        if (!dni) {
            valid = false;
            document.getElementById("DNIusuario").classList.add("incompleto");
        }
        if (!nombreApellido) {
            valid = false;
            document.getElementById("NyAusuario").classList.add("incompleto");
        }
    } else if (tipoUsuario === "Admin") {
        if (!dni) {
            valid = false;
            document.getElementById("DNIusuario").classList.add("incompleto");
        }
        if (!claveAdmin) {
            valid = false;
            document.getElementById("Claveadmin").classList.add("incompleto");
        }
    }

    // Manejo de avance o error
    if (valid) {
        console.log("Tipo de usuario:", tipoUsuario);
        console.log("DNI:", dni);
        postData("verificarUsuario", { tipoUsuario, dni });
        console.log("Datos enviados a SoqueTIC");

        if (tipoUsuario === "Alumno/a" || tipoUsuario === "Profesor/a") {
            desplazarALaPagina("pagina4");
        } else if (tipoUsuario === "Invitado/a") {
            desplazarALaPagina("pagina5");
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
document.getElementById("volver_a_intentar").addEventListener("click", function (event) {
    event.preventDefault();
    desplazarALaPagina("pagina4");
});

// Retirar o devolver computadora en la última página
document.getElementById("retirar").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("devolver_compu").style.display = "none";
    desplazarALaPagina("pagina6");
});

document.getElementById("devolver").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("retirar_compu").style.display = "none";
    desplazarALaPagina("pagina6");
});

// Botón reiniciar de la última página
document.getElementById("reiniciar").addEventListener("click", function (event) {
    event.preventDefault();
    location.reload();
});

// Botones home
document.querySelectorAll(".home").forEach((button) => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
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
document.getElementById("opcionesadmin_reiniciar").addEventListener("click", function (event) {
    event.preventDefault();
    location.reload();
});

// Funcionalidad de la barra de búsqueda dentro de la página con información
document.getElementById("search_bar_nav_bar").addEventListener("input", function () {
    const searchBar = document.getElementById("search_bar_nav_bar");
    const searchBarValue = searchBar.value.trim();

    if (searchBarValue.length > 20) {
        searchBar.value = "";
        searchBar.placeholder = "¿Qué-es-DCI?";
        return;
    }

    if (searchBarValue.length > 1) {
        searchBar.style.caretColor = "#cececf";
    } else {
        searchBar.style.caretColor = "transparent";
    }

    if (searchBarValue === "/restart") {
        searchBar.value = "";
        searchBar.placeholder = "¿Qué-es-DCI?";
        location.reload();
    }

    if (searchBarValue === "/credits") {
        document.getElementById("creditos").style.display = "flex";
        document.getElementById("creditos").classList.remove("opacidad_blur_fade");
        searchBar.value = "";
        searchBar.placeholder = "¿Qué-es-DCI?";
    }

    document.addEventListener("click", function (event) {
        if (!searchBar.contains(event.target)) {
            searchBar.value = "";
        }
    });

    document.getElementById("back_creditos").addEventListener("click", function () {
        document.getElementById("creditos").classList.add("opacidad_blur_fade");
    });

    if (searchBarValue === "/admin") {
        setTimeout(() => {
            const claveIngresada = prompt("Ingrese clave de administrador:");

            if (claveIngresada === "admin") {
                const paginas = document.querySelectorAll(".pagina");


                paginas.forEach((pagina) => {
                    pagina.style.display = "none";
                });

                    document.getElementById("pagina2").style.display = "block";
                    document.getElementById(
                        "contenedor_opciones_pagina2"
                    ).style.display = "none";
                    document.getElementById(
                        "contenedor_home_back"
                    ).style.display = "none";
                    establecerTipoUsuario("Admin");

                    desplazarALaPagina("pagina2");
                } else {
                    searchBar.value = "";
                    searchBar.placeholder = "¿Qué-es-DCI?";
                }
            }, 500);
        }

        if (searchBarValue === "/rick") {
            let rickAudio = document.getElementById("rickAudio");

            if (!rickAudio) {
                rickAudio = document.createElement("audio");
                rickAudio.id = "rickAudio";

                const source = document.createElement("source");
                source.src = "media/rick.mp3";
                source.type = "audio/mpeg";

                rickAudio.appendChild(source);

                document.body.appendChild(rickAudio);
            }

            rickAudio.currentTime = 0;
            rickAudio.play();

            setTimeout(function () {
                rickAudio.pause();
            }, 18000);

            searchBar.value = "";
        }
    });

// SoqueTIC

// document.getElementById("btn_avanzar").addEventListener("click", async () => {
//     if ((tipoUsuario === "Alumno/a" || tipoUsuario === "Profesor/a") && dni !== "")  {

//     console.log(tipoUsuario);
//     console.log(dni);
// };

//     postData("mandarDatosUsuario"), { msg: input.value }});
