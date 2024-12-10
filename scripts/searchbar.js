// Funcionamiento sidebar
const sideBarBtn = document.getElementById("sideBarIcon");
const sidebar = document.getElementById("sideBar");
const contenedorTutorialesDci = document.getElementById(
    "contenedorTutorialesDci"
);
let sideBarAbierta = true;
let placeholder = "¿Qué-es-DCI?";

sideBarBtn.addEventListener("click", function () {
    sideBarAbierta = !sideBarAbierta;
    const tutorialesContainer = document.querySelector(".tutorialesDci");

    if (sideBarAbierta === true) {
        tutorialesContainer.classList.remove("moverContainerIzquierda");
        tutorialesContainer.offsetWidth;
        tutorialesContainer.classList.add("moverContainerIzquierdaReverse");
        // document
        //     .getElementById("contenedorContenidoTutorialesDci")
        //     .classList.remove("cambiarWidth");
        // document.getElementById("contenedorContenidoTutorialesDci").classList.add("cambiarWidthReverse");
    } else {
        tutorialesContainer.classList.remove("moverContainerIzquierdaReverse");
        tutorialesContainer.offsetWidth;
        tutorialesContainer.classList.add("moverContainerIzquierda");
        // document.getElementById("contenedorContenidoTutorialesDci").classList.remove("cambiarWidthReverse");
        // document
        //     .getElementById("contenedorContenidoTutorialesDci")
        //     .classList.add("cambiarWidth");
    }
});

let PantallaSidebar = "queEsDci";

// Función para ocultar todos los elementos del sidebar
function reiniciarPantallasSideBar() {
    document.getElementById("queEsDciSideBar").style.display = "none";
    document.getElementById("tiposUsuariosSideBar").style.display = "none";
    document.getElementById("desbloqueoSidebar").style.display = "none";
    document.getElementById("navegacionSidebar").style.display = "none";
    document.getElementById("guiaAdminSidebar").style.display = "none";
    document
        .getElementById("introduccionTutorial")
        .classList.remove("SideBarElementClicked");
    document
        .getElementById("tiposUsuariosTutorial")
        .classList.remove("SideBarElementClicked");
    document
        .getElementById("desbloqueTutorial")
        .classList.remove("SideBarElementClicked");
    document
        .getElementById("navegacionTutorial")
        .classList.remove("SideBarElementClicked");
    document
        .getElementById("GuiaAdminTutorial")
        .classList.remove("SideBarElementClicked");
}

// Llamar la función para el elemento que se debe mostrar al principio
if (PantallaSidebar === "queEsDci") {
    reiniciarPantallasSideBar();
    document.getElementById("queEsDciSideBar").style.display = "flex";
    document
        .getElementById("introduccionTutorial")
        .classList.add("SideBarElementClicked");
}

// Funciones para mostrar el contenido según el botón presionado
document
    .getElementById("introduccionTutorial")
    .addEventListener("click", function () {
        PantallaSidebar = "queEsDci";
        placeholder = "¿Qué-es-DCI?";
        reiniciarPantallasSideBar();
        document.getElementById("queEsDciSideBar").style.display = "flex";
        document
            .getElementById("introduccionTutorial")
            .classList.add("SideBarElementClicked");
        searchBar.placeholder = placeholder;
    });

document
    .getElementById("tiposUsuariosTutorial")
    .addEventListener("click", function () {
        PantallaSidebar = "tiposUsuarios";
        placeholder = "Tipos-de-Usuarios";
        reiniciarPantallasSideBar();
        document.getElementById("tiposUsuariosSideBar").style.display = "flex";
        document
            .getElementById("tiposUsuariosTutorial")
            .classList.add("SideBarElementClicked");
        searchBar.placeholder = placeholder;
    });

document
    .getElementById("desbloqueTutorial")
    .addEventListener("click", function () {
        PantallaSidebar = "DesbloqueoFacial";
        placeholder = "Desbloqueo-Facial";
        reiniciarPantallasSideBar();
        document.getElementById("desbloqueoSidebar").style.display = "flex";
        document
            .getElementById("desbloqueTutorial")
            .classList.add("SideBarElementClicked");
        searchBar.placeholder = placeholder;
    });

document
    .getElementById("navegacionTutorial")
    .addEventListener("click", function () {
        PantallaSidebar = "Navegacion";
        placeholder = "Botones-de-Navegacion";
        reiniciarPantallasSideBar();
        document.getElementById("navegacionSidebar").style.display = "flex";
        document
            .getElementById("navegacionTutorial")
            .classList.add("SideBarElementClicked");
        searchBar.placeholder = placeholder;
    });

document
    .getElementById("creditosTutorial")
    .addEventListener("click", function () {
        document.getElementById("creditos").style.display = "flex";
        document
            .getElementById("creditos")
            .classList.remove("opacidad_blur_fade");
        searchBar.value = "";
        searchBar.placeholder = placeholder;
        document.getElementById("mostrarVersion").textContent = version;
    });

document
    .getElementById("GuiaAdminTutorial")
    .addEventListener("click", function () {
        PantallaSidebar = "guiaAdmin";
        placeholder = "Guia-de-Admin";
        reiniciarPantallasSideBar();
        document.getElementById("guiaAdminSidebar").style.display = "flex";
        document
            .getElementById("GuiaAdminTutorial")
            .classList.add("SideBarElementClicked");
        searchBar.placeholder = placeholder;
    });

const searchBar = document.getElementById("search_bar_nav_bar");
let adminVerificado = false;

// Evento principal de input para searchBar
searchBar.addEventListener("input", function () {
    const searchBarValue = searchBar.value.trim();

    // Cambiar caret color según longitud del texto
    searchBar.style.caretColor =
        searchBarValue === "" ? "transparent" : "#cececf";

    // Limitar longitud del input y restablecer placeholder
    if (searchBarValue.length > 40) {
        searchBar.value = "";
        searchBar.placeholder = placeholder;
    }

    // Comandos específicos
    if (searchBarValue === "/reset" && adminVerificado) {
        searchBar.value = "";
        searchBar.placeholder = placeholder;
        location.reload();
    } else if (searchBarValue === "/logout" && adminVerificado) {
        searchBar.value = "";
        searchBar.placeholder = placeholder;
        adminVerificado = false;
        document.getElementById("mostrarAdminVerificado").style.display =
            "none";
        document.getElementById("GuiaAdminTutorial").style.display = "none";
        alert("Se cerró sesión");
    } else if (
        searchBarValue === "/credits" ||
        searchBarValue === "/creditos"
    ) {
        document.getElementById("creditos").style.display = "flex";
        document
            .getElementById("creditos")
            .classList.remove("opacidad_blur_fade");
        searchBar.value = "";
        document.getElementById("mostrarVersion").textContent = version;
        searchBar.placeholder = placeholder;
        // } else if (searchBarValue === "/version") {
        //     searchBar.value = version; // Asegúrate de que `version` esté definida
        //     setTimeout(() => {
        //         searchBar.value = "";
        //         searchBar.placeholder = placeholder;
        //     }, 3000);
    } else if (searchBarValue === "/admin" && !adminVerificado) {
        // Verificación de administrador
        searchBar.type = "password";
        searchBar.value = "";
        searchBar.placeholder = "";
        setTimeout(() => {
            const claveIngresada = searchBar.value.trim();
            if (claveIngresada === "admin") {
                adminVerificado = true;
                alert("Acceso administrador verificado");
                document.getElementById(
                    "mostrarAdminVerificado"
                ).style.display = "flex";
                document.getElementById("GuiaAdminTutorial").style.display =
                    "flex";
            }
            searchBar.value = "";
            searchBar.type = "text";
            searchBar.placeholder = placeholder;
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
            animaciones = false;
            searchBar.value = "";
            alert("Animaciones activadas");
        } else if (searchBarValue === "/animaciones/false") {
            animaciones = true;
            searchBar.value = "";
            alert("Animaciones Desactivadas");
        }
    }
});

// Abrir menú de ayuda cuando se da clic al botón de info
document.getElementById("btn_info_dci").addEventListener("click", function () {
    document.getElementById("info_dci").style.display = "flex";
    document.getElementById("info_dci").classList.remove("opacidad_blur_fade");
    document.getElementById("btn_info_dci").style.display = "none";
    document.getElementById("btn_inicio").style.display = "none";
    document.querySelector("h1").style.display = "none";
    document.getElementById("tutorialesDci ").className =
        "tutorialesDci  flex_center";
    PantallaSidebar = "queEsDci";
});

document.getElementById("back_info").addEventListener("click", function () {
    if (adminVerificado) {
        const confirmacion = confirm("¿Realmente quieres salir?");
        if (confirmacion) {
            pantallaSidebar = "queEsDci";
            placeholder = "¿Qué-es-DCI?";
            reiniciarPantallasSideBar();
            document.getElementById("queEsDciSideBar").style.display = "flex";
            document
                .getElementById("introduccionTutorial")
                .classList.add("SideBarElementClicked");
            searchBar.placeholder = placeholder;

            adminVerificado = false;
            alert("Se cerró sesión");
            document.getElementById("mostrarAdminVerificado").style.display =
                "none";
            document.getElementById("GuiaAdminTutorial").style.display = "none";
            document
                .getElementById("info_dci")
                .classList.add("opacidad_blur_fade");
            document.getElementById("btn_info_dci").style.display = "flex";
            document.getElementById("btn_inicio").style.display = "block";
            document.querySelector("h1").style.display = "block";
            console.log(
                "PantallaSidebar se ha definido como:",
                PantallaSidebar
            );
            document.getElementById("mostrarAdminVerificado").style.display =
                "none";
        }
    } else {
        document.getElementById("info_dci").classList.add("opacidad_blur_fade");
        document.getElementById("btn_info_dci").style.display = "flex";
        document.getElementById("btn_inicio").style.display = "block";
        document.querySelector("h1").style.display = "block";
        console.log("PantallaSidebar se ha definido como:", PantallaSidebar);
        pantallaSidebar = "queEsDci";
            placeholder = "¿Qué-es-DCI?";
            reiniciarPantallasSideBar();
            document.getElementById("queEsDciSideBar").style.display = "flex";
            document
                .getElementById("introduccionTutorial")
                .classList.add("SideBarElementClicked");
            searchBar.placeholder = placeholder;
    }
});

document.getElementById("back_creditos").addEventListener("click", function () {
    document.getElementById("creditos").classList.add("opacidad_blur_fade");
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
    searchCredits.style.caretColor =
        searchBarValue.length === 0 ? "transparent" : "#cececf";

    if (searchBarValue.length > 15) {
        searchCredits.value = "";
        searchCredits.placeholder = "Créditos";
    }

    if (searchBarValue === "/backgroundNormal") {
        document.getElementById("background").classList.remove("backgroundCover");
        searchCredits.value = "";
    }

    if (searchBarValue === "/background2") {
        document.getElementById("background").classList.add("backgroundCover");
        console.log("sad")
        searchCredits.value = "";
    }

    if (searchBarValue === "/rick") {
        let rickAudio =
            document.getElementById("rickAudio") ||
            document.createElement("audio");
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
