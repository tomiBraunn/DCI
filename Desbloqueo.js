// Funcionalidad api
const video = document.getElementById("video");
const overlayCanvas = document.getElementById("overlayCanvas");
const imageUpload = document.getElementById("imageUpload");
const capturedImage = document.getElementById("capturedImage");
const captureButton = document.getElementById("captureButton");

let uploadedFaceData;
let capturedFaceData;

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Carga inicial: DOMContentLoaded");

    console.time("Cargar modelos");
    await faceapi.nets.tinyFaceDetector.loadFromUri("./face-api/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("./face-api/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("./face-api/models");
    console.timeEnd("Cargar modelos");
    document.querySelector(".loader").style.display = "none";

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
            console.log("Video iniciado");

            video.addEventListener("play", () => {
                const canvas = faceapi.createCanvasFromMedia(video);
                document.querySelector(".scroll-container").style.display = "flex";

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

                    const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    overlayCanvas.getContext("2d").clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

                    faceapi.draw.drawDetections(overlayCanvas, resizedDetections);
                    faceapi.draw.drawFaceLandmarks(overlayCanvas, resizedDetections);
                }, 100);
            });
        })
        .catch((err) => {
            console.error("Error al acceder a la cámara", err);
            alert("No se pudo acceder a la cámara");
        });

    document.querySelector(".scroll-container").style.display = "flex";
}

captureButton.addEventListener("click", async () => {
    
    const canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgDataUrl = canvas.toDataURL("image/jpeg");
    capturedImage.src = imgDataUrl;

    const img = await faceapi.fetchImage(imgDataUrl);
    console.log("Imagen capturada");

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

    console.time("Tiempo de comparación");  // Iniciar contador
    const distance = faceapi.euclideanDistance(uploadedFaceData.descriptor, capturedFaceData.descriptor);
    const threshold = 0.4;
    const isSamePerson = distance < threshold;
    console.log(
        "Es la misma persona: " + isSamePerson + "\n" +
        "Igualdad: " + threshold + "\n" +
        "Resultado de la comparación: " + isSamePerson
    );    console.timeEnd("Tiempo de comparación");  // Terminar contador

    desplazarALaPagina("pagina5");

    if (isSamePerson) {
        document.getElementById("usuarioNOverificado_pagina5").style.display = "none";
        document.getElementById("usuarioverificado_pagina5").style.display = "flex";
    } else {
        document.getElementById("usuarioverificado_pagina5").style.display = "none";
        document.getElementById("usuarioNOverificado_pagina5").style.display = "flex";
    }
});

imageUpload.addEventListener("change", async (event) => {
    console.log("Cargando imagen subida...");

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

    console.log("Imagen subida y detectada.");
});