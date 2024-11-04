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

// Boton de reinicio en caso de que no se conecte SoqueTic

document
    .getElementById("reinicioSoqueTic")
    .addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

// botones de pagina admin
document
    .getElementById("btn_agregarSacarUsuarios")
    .addEventListener("click", function (event) {
        document.getElementById("contenedorOpcionesAdmin").style.display =
            "flex";
        document.getElementById("agregarSacarUsuarios").style.display = "flex";
    });

document
    .getElementById("btn_configuracionAdmin")
    .addEventListener("click", function (event) {
        document.getElementById("contenedorOpcionesAdmin").style.display =
            "flex";
        document.getElementById("configuracionAdmin").style.display = "flex";
    });

document
    .getElementById("salirContenedorOpcionesAdmin")
    .addEventListener("click", function (event) {
        document.getElementById("contenedorOpcionesAdmin").style.display =
            "none";
        document.getElementById("agregarSacarUsuarios").style.display = "none";
        document.getElementById("configuracionAdmin").style.display = "none";
    });
