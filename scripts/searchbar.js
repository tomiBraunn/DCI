// Funcionalidad de la barra de búsqueda
const searchBar = document.getElementById("search_bar_nav_bar");
searchBar.addEventListener("input", function () {
    const searchBarValue = searchBar.value.trim();

    // Limpiar el valor si se hace clic fuera del campo
    document.addEventListener("click", function (event) {
        if (!searchBar.contains(event.target)) {
            searchBar.value = "";
        }
    });

    // Cambiar caret color según longitud del texto
    if (searchBarValue.length > 1) {
        searchBar.style.caretColor = "#cececf";
    } else {
        searchBar.style.caretColor = "transparent";
    }

    // Limitar longitud del input y restablecer placeholder
    if (searchBarValue.length > 40) {
        searchBar.value = "";
        searchBar.placeholder = "¿Qué-es-DCI?";
    }

    // Comandos específicos
    if (searchBarValue === "/restart" || searchBarValue === "/reiniciar" || searchBarValue === "/reset") {
        searchBar.value = "";
        searchBar.placeholder = "¿Qué-es-DCI?";
        location.reload();
    } else if (searchBarValue === "/credits" || searchBarValue === "/creditos") {
        document.getElementById("creditos").style.display = "flex";
        document.getElementById("creditos").classList.remove("opacidad_blur_fade");
        searchBar.value = "";
        searchBar.placeholder = "¿Qué-es-DCI?";
    } else if (searchBarValue === "/version") {
        searchBar.value = version;
        setTimeout(() => {
            searchBar.value = "";
            searchBar.placeholder = "¿Qué-es-DCI?";
        }, 3000);
    }
});

// Verificación de administrador
let adminVerificado = false;
searchBar.addEventListener("input", function () {
    const searchBarValue = searchBar.value.trim();
    
    if (searchBarValue === "/admin" && adminVerificado != true) {
    // if (searchBarValue === "/admin" || searchBarValue === "/registros") {

        searchBar.type = "password";
        setTimeout(() => {
            const claveIngresada = searchBar.value.trim();
            if (claveIngresada === "admin") {
                adminVerificado = true;
                alert("Acceso administrador verificado");
            }
            searchBar.value = "";
            searchBar.type = "text";
            searchBar.placeholder = "¿Qué-es-DCI?";
        }, 3000);
    }

//     if (adminVerificado && (searchBarValue === "/admin/overlay/true" || searchBarValue === "/admin/overlay/false")) {
//         const overlay = searchBarValue === "/admin/overlay/true";
//         document.getElementById("overlayCanvas").style.display = overlay ? "block" : "none";
//         alert(`Overlay ${overlay ? "activado" : "desactivado"}`);
//         searchBar.value = "";
//         searchBar.type = "text";
//     }
// });

// Funcionalidad de barra de búsqueda en pantalla de créditos
const searchCredits = document.getElementById("search_credits");
searchCredits.addEventListener("input", function () {
    const searchBarValue = searchCredits.value.trim();
    searchCredits.style.caretColor = searchBarValue.length > 1 ? "#cececf" : "transparent";

    if (searchBarValue.length > 15) {
        searchCredits.value = "";
        searchCredits.placeholder = "Creditos";
    }

    if (searchBarValue === "/rick") {
        let rickAudio = document.getElementById("rickAudio") || document.createElement("audio");
        if (!rickAudio.src) {
            rickAudio.id = "rickAudio";
            rickAudio.src = "media/rick.mp3";
            rickAudio.type = "audio/mpeg";
            document.body.appendChild(rickAudio);
        }
        rickAudio.currentTime = 0;
        rickAudio.play();
        setTimeout(() => rickAudio.pause(), 18000);
        searchCredits.value = "";
    }
});


    document.addEventListener("click", function (event) {
        if (!searchBar.contains(event.target)) {
            searchBar.value = "";
        }
    });

