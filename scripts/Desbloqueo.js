//Funcionalidad API
const video = document.getElementById("video");
const overlayCanvas = document.getElementById("overlayCanvas");
const imageUpload = document.getElementById("imageUpload");
const capturedImage = document.getElementById("capturedImage");
const captureButton = document.getElementById("captureButton");

let uploadedFaceData; 
let capturedFaceData;

var overlay;
fetchData("overlayCamara", (data) => {
    overlay = data;
});

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Carga inicial: DOMContentLoaded");

    console.time("Cargar modelos");
    await faceapi.nets.tinyFaceDetector.loadFromUri("./face-api/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("./face-api/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("./face-api/models");
    console.timeEnd("Cargar modelos");
    document.querySelector(".loader").classList.add("opacidad_blur_fade");
    setTimeout(() => {
        document.querySelector(".loader").classList.remove("opacidad_blur_fade");
    }, 1100);
    document.querySelector(".loader").style.display = "none";
    startVideo();
    if (soquetic == undefined) {
        document.querySelector("main").style.display = "none";

    }
    else {
        document.getElementById("SoqueTicNoCargado").style.display = "none";
        document.querySelector("main").style.display = "flex";
}});

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
                // document.querySelector(".scroll-container").style.display = "flex";

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
                    if (overlay == true){    
                        overlayCanvas.getContext("2d").clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
                        faceapi.draw.drawDetections(overlayCanvas, resizedDetections);
                        document.getElementById("overlayCanvas").style.display = "block"
                    }
                    else {
                        document.getElementById("overlayCanvas").style.display = "none"
                    }
                }, 100);
            });
        })
        .catch((err) => {
            console.error("Error al acceder a la cámara", err);
            alert("No se pudo acceder a la cámara");
        });

    // document.querySelector(".scroll-container").style.display = "flex";
}

captureButton.addEventListener("click", async () => {

    const canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgDataUrl = canvas.toDataURL("image/jpeg");
    capturedImage.src = imgDataUrl;

    const img = new Image();
    img.src = imgDataUrl;

    img.onload = async () => {
        capturedFaceData = await faceapi
            .detectSingleFace(img, tinyFaceDetectorOptions)
            .withFaceLandmarks()
            .withFaceDescriptor();

        try {
            var base64Image;
            postData("imagen", {
                dni: dni
            }, async (base64Image) => {
                const base64Response = await fetch(base64Image);
                const blob = await base64Response.blob();
                const base64Img = await faceapi.bufferToImage(blob); 
    
                uploadedFaceData = await faceapi
                    .detectSingleFace(base64Img, tinyFaceDetectorOptions)
                    .withFaceLandmarks()
                    .withFaceDescriptor();

                if (!capturedFaceData) {
                    // alert("No se detectó ninguna cara en la captura.");
                    if (document.querySelector(".contenedor_pagina4").classList.contains("shake")) {
                        document.querySelector(".contenedor_pagina4").classList.remove("shake");
                    }
                    document.querySelector(".contenedor_pagina4").classList.add("shake");
        
                    setTimeout(() => {
                        document.querySelector(".contenedor_pagina4").classList.remove("shake");
                    }, 500);
                    return;
                }
    
                if (!uploadedFaceData || !capturedFaceData) {
                    alert("Ambas imágenes necesitan ser detectadas para la comparación.");
                    return;
                }
    
                console.time("Tiempo de comparación");
                const distance = faceapi.euclideanDistance(uploadedFaceData.descriptor, capturedFaceData.descriptor);
                const threshold = 0.55;
                const isSamePerson = distance < threshold;
                const Igualdad = threshold - distance;
                console.log(
                    "Es la misma persona: " + isSamePerson + "\n" +
                    "Igualdad: " + Igualdad + "\n" +
                    "Resultado de la comparación: " + isSamePerson
                );
                console.timeEnd("Tiempo de comparación");
    
                desplazarALaPagina("pagina5");
    
                if (isSamePerson) {
                    document.getElementById("usuarioNOverificado_pagina5").style.display = "none";
                    document.getElementById("usuarioverificado_pagina5").style.display = "flex";
                } else {
                    document.getElementById("usuarioverificado_pagina5").style.display = "none";
                    document.getElementById("usuarioNOverificado_pagina5").style.display = "flex";
                }
            });
        } catch (error) {
            console.error("Error en la comparación de imágenes:", error);
            alert("Ocurrió un error al procesar las imágenes.");
        }
    };

    img.onerror = (error) => {
        console.error("Error al cargar la imagen:", error);
        alert("Error al cargar la imagen capturada. Por favor, intenta de nuevo.");
    };
});

imageUpload.addEventListener("change", async (event) => {
    console.log("Cargando imagen subida...");

    const file = event.target.files[0];
    if (!file) {
        alert("Por favor selecciona una imagen.");
        return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
        const imgDataUrl = reader.result;

        const img = new Image();
        img.src = imgDataUrl;
        img.onload = async () => {
            uploadedFaceData = await faceapi
                .detectSingleFace(img, tinyFaceDetectorOptions)
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (!uploadedFaceData) {
                alert("No se detectó ninguna cara en la imagen subida");
            }

            console.log("Imagen subida y detectada.");
        };
    };
    reader.readAsDataURL(file);
});