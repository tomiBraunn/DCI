const searchBar = document.getElementById("search_bar_nav_bar");
let adminVerificado = false;

// Evento principal de input para searchBar
searchBar.addEventListener("input", function () {
    const searchBarValue = searchBar.value.trim();

    // Cambiar caret color según longitud del texto
    searchBar.style.caretColor = searchBarValue === "" ? "transparent" : "#cececf";

    // Limitar longitud del input y restablecer placeholder
    if (searchBarValue.length > 40) {
        searchBar.value = "";
        searchBar.placeholder = "¿Qué-es-DCI?";
    }

    // Comandos específicos
    if (searchBarValue === "/reset" && adminVerificado) {
        searchBar.value = "";
        searchBar.placeholder = "¿Qué-es-DCI?";
        location.reload();
    } else if (searchBarValue === "/logout" && adminVerificado) {
        searchBar.value = "";
        searchBar.placeholder = "¿Qué-es-DCI?";
        adminVerificado = false;
        alert("Se cerró sesión");
    } else if (searchBarValue === "/credits" || searchBarValue === "/creditos") {
        document.getElementById("creditos").style.display = "flex";
        document.getElementById("creditos").classList.remove("opacidad_blur_fade");
        searchBar.value = "";
        searchBar.placeholder = "¿Qué-es-DCI?";
    } else if (searchBarValue === "/version") {
        searchBar.value = version; // Asegúrate de que `version` esté definida
        setTimeout(() => {
            searchBar.value = "";
            searchBar.placeholder = "¿Qué-es-DCI?";
        }, 3000);
    } else if (searchBarValue === "/admin" && !adminVerificado) {
        // Verificación de administrador
        searchBar.type = "password";
        searchBar.value = "";
        searchBar.placeholder = "Ingrese-su-contraseña";
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
    } else if (adminVerificado) {
        // Lógica para activar/desactivar el overlay y animaciones solo si el admin está verificado
        if (searchBarValue === "/overlay/true") {
            overlay = true;
            document.getElementById("overlayCanvas").style.display = "block";
            alert("Overlay activado");
            searchBar.value = "";
        } else if (searchBarValue === "/overlay/false") {
            overlay = false;
            document.getElementById("overlayCanvas").style.display = "none";
            alert("Overlay desactivado");
            searchBar.value = "";
        } else if (searchBarValue === "/animaciones/true") {
            animaciones = true;
            searchBar.value = "";
        } else if (searchBarValue === "/animaciones/false") {
            animaciones = false;
            searchBar.value = "";
        }
    }
});

document.getElementById("back_creditos").addEventListener("click", function () {
    document.getElementById("creditos").classList.add("opacidad_blur_fade")
});

// Limpiar el valor si se hace clic fuera del campo de búsqueda
document.addEventListener("click", function (event) {
    if (!searchBar.contains(event.target)) {
        searchBar.value = "";
    }
});

// Funcionalidad de barra de búsqueda en pantalla de créditos
const searchCredits = document.getElementById("search_credits");
searchCredits.addEventListener("input", function () {
    const searchBarValue = searchCredits.value.trim();
    searchCredits.style.caretColor = searchBarValue.length === 0 ? "transparent" : "#cececf";

    if (searchBarValue.length > 15) {
        searchCredits.value = "";
        searchCredits.placeholder = "Créditos";
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
