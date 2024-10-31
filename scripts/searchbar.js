// Funcionalidad de la barra de búsqueda dentro de la página con información
document
    .getElementById("search_bar_nav_bar")
    .addEventListener("input", function () {
        const searchBar = document.getElementById("search_bar_nav_bar");
        const searchBarValue = searchBar.value.trim();
        searchBar.style.caretColor = "transparent";

        document.addEventListener("click", function (event) {
            if (!searchBar.contains(event.target)) {
                searchBar.value = "";
            }
        });

        if (searchBarValue.length > 40) {
            searchBar.value = "";
            searchBar.placeholder = "¿Qué-es-DCI?";
            return;
        }

        if (searchBarValue.length > 1) {
            searchBar.style.caretColor = "#cececf";
        }

        if (searchBarValue.length < 0) {
            searchBar.style.caretColor = "transparent";
        }

        if (
            searchBarValue === "/restart" ||
            searchBarValue === "/reiniciar" ||
            searchBarValue === "/reset"
        ) {
            searchBar.value = "";
            searchBar.placeholder = "¿Qué-es-DCI?";
            location.reload();
        }

        if (searchBarValue === "/credits" || searchBarValue === "/creditos") {
            document.getElementById("creditos").style.display = "flex";
            document
                .getElementById("creditos")
                .classList.remove("opacidad_blur_fade");
            searchBar.value = "";
            searchBar.placeholder = "¿Qué-es-DCI?";
        }

        if (searchBarValue === "/version") {
            searchBar.style.caretColor = "transparent";
            searchBar.value = version;
            setTimeout(() => {
                searchBar.value = "";
                searchBar.placeholder = "¿Qué-es-DCI?";
            }, 3000);
        }

        if (searchBarValue === "/admin" || searchBarValue === "/registros") {
            setTimeout(() => {
                const claveIngresada = prompt(
                    "Ingrese clave de administrador:"
                );

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
    });

document.getElementById("back_creditos").addEventListener("click", function () {
    document.getElementById("creditos").classList.add("opacidad_blur_fade");
});
// Funcionalidad de la barra de búsqueda dentro de la pantalla de creditos
document
    .getElementById("search_credits")
    .addEventListener("input", function () {
        const searchBar = document.getElementById("search_credits");
        const searchBarValue = searchBar.value.trim();
        searchBar.style.caretColor = "transparent";

        if (searchBarValue.length > 15) {
            searchBar.value = "";
            searchBar.placeholder = "Creditos";
            return;
        }

        if (searchBarValue.length > 1) {
            searchBar.style.caretColor = "#cececf";
        }

        if (searchBarValue.length < 0) {
            searchBar.style.caretColor = "transparent";
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

        document.addEventListener("click", function (event) {
            if (!searchBar.contains(event.target)) {
                searchBar.value = "";
            }
        });
    });

