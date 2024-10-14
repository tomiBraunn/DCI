let tipoUsuario = "";

// Función para desplazar a la siguiente página
function desplazarALaPagina(paginaId) {
    document.querySelector(".scroll-container").scrollTo({
        left: document.getElementById(paginaId).offsetLeft,
        behavior: "smooth",
    });
}

// Botón de inicio en la primera página
document
    .getElementById("btn_inicio")
    .addEventListener("click", function (event) {
        event.preventDefault();
        desplazarALaPagina("pagina2");
    });

// Abrir menu de ayuda cuando se da click al boton de info
document.getElementById("btn_info_dci").addEventListener("click", function () {
    document.getElementById("info_dci").style.display = "flex";
    document.getElementById("info_dci").classList.remove("opacidad_blur_fade");
    document.getElementById("btn_info_dci").style.display = "none";
    document.querySelector("h1").style.display = "none";
    document.getElementById("btn_inicio").style.display = "none";
});

// Cerrar menu de ayuda cuando se da click al boton de cerrar
document.getElementById("back_info").addEventListener("click", function () {
    // document.getElementById("info_dci").style.display = "none";
    document.getElementById("info_dci").classList.add("opacidad_blur_fade");
    document.getElementById("btn_info_dci").style.display = "flex";
    document.querySelector("h1").style.display = "block";
    document.getElementById("btn_inicio").style.display = "block";
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
document
    .getElementById("admin")
    .addEventListener("click", () => establecerTipoUsuario("Admin"));

// Definir qué inputs son necesarios según el tipo de usuario
function establecerTipoUsuario(tipo) {
    tipoUsuario = tipo;
    document.getElementById("tipousuario").textContent = tipo;

    document.getElementById("DNIusuario").style.display = "none";
    document.getElementById("NyAusuario").style.display = "none";
    document.getElementById("Claveadmin").style.display = "none";
    document.getElementById("curso_usuario").style.display = "none";

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
document
    .getElementById("btn_avanzar")
    .addEventListener("click", function (event) {
        event.preventDefault();

        let valid = true;
        const dni = document.getElementById("DNIusuario").value.trim();
        const nombreApellido = document
            .getElementById("NyAusuario")
            .value.trim();
        const claveAdmin = document.getElementById("Claveadmin").value.trim();
        const curso = document.getElementById("curso_usuario");
        const division = document.getElementById("division");
        const especialidad = document.getElementById("especialidad");
        const botonAvanzar = document.getElementById("btn_avanzar");

        // Aplicar un estilo a los inputs incompletos
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
        } else if (tipoUsuario === "Admin") {
            if (!dni) {
                valid = false;
                document
                    .getElementById("DNIusuario")
                    .classList.add("incompleto");
            }
            if (!claveAdmin) {
                valid = false;
                document
                    .getElementById("Claveadmin")
                    .classList.add("incompleto");
            }
        }

        if (valid) {
            console.log("Tipo de usuario:", tipoUsuario);
            console.log("DNI:", dni);
            // postData("mandarDatosUsuario"), { tipoUsuario, dni};
            console.log("mandado a soquetic");

            // Verificar a qué página debe avanzar según el tipo de usuario
            if (tipoUsuario === "Alumno/a" || tipoUsuario === "Profesor/a") {
                desplazarALaPagina("pagina4");
            } else if (tipoUsuario === "Invitado/a") {
                desplazarALaPagina("pagina5");
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

// Volver a la página si la cara no coincide
document
    .getElementById("volver_a_intentar")
    .addEventListener("click", function (event) {
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

// Botón reinicio de la ultima pagina
document
    .getElementById("reiniciar")
    .addEventListener("click", function (event) {
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

// Botón reinicio página admin
document
    .getElementById("opcionesadmin_reiniciar")
    .addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

// Funcionalidad de la barra de busqueda adentro de la pagina con informacion
document
    .getElementById("search_bar_nav_bar")
    .addEventListener("input", function () {
        const searchBar = document.getElementById("search_bar_nav_bar");
        const searchBarValue = searchBar.value.trim();

        if (searchBarValue.length > 20) {
            searchBar.value = "";
            searchBar.placeholder = "¿Qué-es-DCI?";
            return;
        }

        if (searchBarValue.length > 1) {
            document.getElementById("search_bar_nav_bar").style.caretColor =
                "#cececf";
        } else {
            document.getElementById("search_bar_nav_bar").style.caretColor =
                "transparent";
        }

        if (searchBarValue === "/restart") {
            searchBar.value = "";
            searchBar.placeholder = "¿Qué-es-DCI?";
            event.preventDefault();
            location.reload();
        }

        if (searchBarValue === "/credits") {
            document.getElementById("creditos").style.display = "flex";
            document
                .getElementById("creditos")
                .classList.remove("opacidad_blur_fade");
            searchBar.value = "";
            searchBar.placeholder = "¿Qué-es-DCI?";
        }

        document.addEventListener("click", function (event) {
            if (!searchBar.contains(event.target)) {
                searchBar.value = "";
            }
        });

        document
            .getElementById("back_creditos")
            .addEventListener("click", function (event) {
                // document.getElementById("creditos").style.display = "none";
                document
                    .getElementById("creditos")
                    .classList.add("opacidad_blur_fade");
            });

        if (searchBarValue === "/admin") {
            setTimeout(() => {
                const claveIngresada = prompt("");

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

// Funcionalidad api
const video = document.getElementById("video");
const overlayCanvas = document.getElementById("overlayCanvas");
const imageUpload = document.getElementById("imageUpload");
const capturedImage = document.getElementById("capturedImage");
const captureButton = document.getElementById("captureButton");

let uploadedFaceData;
let capturedFaceData;

document.addEventListener("DOMContentLoaded", async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("./models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("./models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("./models");
    startVideo();
});

const tinyFaceDetectorOptions = new faceapi.TinyFaceDetectorOptions({
    inputSize: 160,
    scoreThreshold: 0.5,
});

function startVideo() {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
            video.addEventListener("play", () => {
                const canvas = faceapi.createCanvasFromMedia(video);
                document.body.append(canvas);
                const displaySize = {
                    width: video.videoWidth,
                    height: video.videoHeight,
                };
                faceapi.matchDimensions(overlayCanvas, displaySize);
                setInterval(async () => {
                    const detections = await faceapi
                        .detectAllFaces(video, tinyFaceDetectorOptions)
                        .withFaceLandmarks()
                        .withFaceDescriptors();
                    const resizedDetections = faceapi.resizeResults(
                        detections,
                        displaySize
                    );
                    overlayCanvas
                        .getContext("2d")
                        .clearRect(
                            0,
                            0,
                            overlayCanvas.width,
                            overlayCanvas.height
                        );
                    faceapi.draw.drawDetections(
                        overlayCanvas,
                        resizedDetections
                    );
                    faceapi.draw.drawFaceLandmarks(
                        overlayCanvas,
                        resizedDetections
                    );
                }, 100);
            });
        })
        .catch((err) => {
            console.error("Error accessing the camera: ", err);
            alert("Could not access the camera.");
        });
    document.querySelector(".scroll-container").style.display = "flex";
    // document.querySelector(".loader").style.display = "none";
}

captureButton.addEventListener("click", async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgDataUrl = canvas.toDataURL("image/jpeg");
    capturedImage.src = imgDataUrl;

    const img = await faceapi.fetchImage(imgDataUrl);
    capturedFaceData = await faceapi
        .detectSingleFace(img, tinyFaceDetectorOptions)
        .withFaceLandmarks()
        .withFaceDescriptor();

    if (!capturedFaceData) {
        alert("No se detectó ninguna cara en la foto");
        return;
    }

    if (!uploadedFaceData || !capturedFaceData) {
        alert("Ambas imágenes necesitan ser detectadas para la comparación.");
        return;
    }

    const distance = faceapi.euclideanDistance(
        uploadedFaceData.descriptor,
        capturedFaceData.descriptor
    );
    const threshold = 0.4;
    const isSamePerson = distance < threshold;

    // Mostrar si la cara es la misma
    desplazarALaPagina("pagina5");
    if (isSamePerson) {
        document.getElementById("usuarioNOverificado_pagina5").style.display =
            "none";
        document.getElementById("usuarioverificado_pagina5").style.display =
            "flex";
    } else {
        document.getElementById("usuarioverificado_pagina5").style.display =
            "none";
        document.getElementById("usuarioNOverificado_pagina5").style.display =
            "flex";
    }
});

imageUpload.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) {
        alert("Por favor selecciona una imagen.");
        return;
    }

    const img = await faceapi.fetchImage(URL.createObjectURL(file));
    uploadedFaceData = await faceapi
        .detectSingleFace(img, tinyFaceDetectorOptions)
        .withFaceLandmarks()
        .withFaceDescriptor();

    if (!uploadedFaceData) {
        alert("No se detectó ninguna cara en la imagen subida");
        return;
    }
});
