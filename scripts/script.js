let soquetic;

fetchData("verificarSoqueTic", (data) => {
    soquetic = data;
});

if (soquetic == undefined) {
    document.querySelector("main").style.display = "none";
    document.getElementById("SoqueTicNoCargado").style.display = "flex";
    document
        .getElementById("SoqueTicNoCargado")
        .classList.add(".opacidad_blur");
}

const version = "v.1.00";
let tipoUsuario = "";

var animaciones = false;
// fetchData("animacionesPaginas", (data) => {
//     animaciones = data;
// });

// Función para desplazar a la siguiente página

function desplazarALaPagina(paginaId) {
    document.querySelector(".scroll-container").scrollTo({
        left: document.getElementById(paginaId).offsetLeft,
        behavior: animaciones ? "auto" : "smooth",
    });

    // Verifica si estamos en la página 2
    if (paginaId === "pagina2" || paginaId === "pagina5") {
        const adjustmentLayer = document.getElementById("adjustmentLayer");

        // Elimina todas las clases excepto "adjustmentLayer"
        adjustmentLayer.className = "adjustmentLayer pAbs fullWidth fullHeight";
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
    document.getElementById("tutorialesDci ").className = "tutorialesDci  flex_center";
});


// Definir el tipo de usuario
document
    .getElementById("alumno")
    .addEventListener("click", () => establecerTipoUsuario("Alumno/a"));
document
    .getElementById("profesor")
    .addEventListener("click", () => establecerTipoUsuario("Profesor/a"));
// document
//     .getElementById("invitado")
//     .addEventListener("click", () => establecerTipoUsuario("Invitado/a"));
document.getElementById("invitado").addEventListener("click", function () {
    document.getElementById("invitado").classList.contains("shake");
document.getElementById("invitado").classList.remove("shake");
document.getElementById("invitado").classList.add("shake");
setTimeout(() => {
document.getElementById("invitado").classList.remove("shake");
}, 500);
});


function establecerTipoUsuario(tipo) {
    tipoUsuario = tipo;
    document.getElementById("mostarTipoUsuario").textContent = tipo;

    // Ocultar elementos
    document.getElementById("DNIusuario").style.display = "none";
    document.getElementById("NyAusuario").style.display = "none";
    document.getElementById("curso_usuario").style.display = "none";
    document.getElementById("DNIusuario").value = "";

    // Mostrar inputs segun el tipo de usuario y agregar adjustment layer
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

        if (valid) {
            if (dni != "") {
                postData("getNombre", { dni: dni }, (nombre) => {
                    if (!nombre) {
                        document
                            .getElementById("DNIusuario")
                            .classList.add("incompleto");
                        if (
                            document
                                .getElementById("pagina3")
                                .classList.contains("shake")
                        ) {
                            document
                                .getElementById("pagina3")
                                .classList.remove("shake");
                        }
                        document
                            .getElementById("pagina3")
                            .classList.add("shake");

                        setTimeout(() => {
                            document
                                .getElementById("pagina3")
                                .classList.remove("shake");
                        }, 500);
                    } else {
                        document.getElementById("nombre").textContent = nombre;
                        desplazarALaPagina("pagina4");
                    }
                });
            } else {
                // console.log("Faltan datos o tipo de usuario no válido");
            }
        } else {
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

// Función para reiniciar
function reiniciarEstado() {
    const pantallas = document.querySelectorAll(".pantalla");
    pantallas.forEach((pantalla) => {
        pantalla.style.display = "none";
    });

    const paginas = document.querySelectorAll(".pagina");
    const botonesHome = document.querySelectorAll(".home");

    paginas.forEach((pagina) => {
        pagina.style.display = "none";
    });

    botonesHome.forEach((boton) => {
        boton.style.display = "none";
    });

    desplazarALaPagina("pagina1");

    setTimeout(() => {
        paginas.forEach((pagina) => {
            pagina.style.display = "flex";
        });

        botonesHome.forEach((boton) => {
            boton.style.display = "flex";
        });
    }, 300);

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
    sidebar.style.display = "flex";
    sidebar.style.width = "auto";
    tutorial.style.width = "75%";
    document.getElementById("background").classList.remove("backgroundCover");
}
