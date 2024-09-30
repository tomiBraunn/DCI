let tipoUsuario = '';

// Función para desplazar a la siguiente página
function desplazarALaPagina(paginaId) {
    document.querySelector('.scroll-container').scrollTo({
        left: document.getElementById(paginaId).offsetLeft,
        behavior: 'smooth'
    });
}

// Botón de inicio en la primera página
document.getElementById('btn_inicio').addEventListener('click', function(event) {
    event.preventDefault();
    desplazarALaPagina('pagina2');
});

// Definir qué inputs son necesarios según el tipo de usuario
function establecerTipoUsuario(tipo) {
    tipoUsuario = tipo;
    document.getElementById('tipousuario').textContent = tipo;

    document.getElementById('DNIusuario').style.display = 'none';
    document.getElementById('NyAusuario').style.display = 'none';
    document.getElementById('Claveadmin').style.display = 'none';
    document.getElementById('curso_usuario').style.display = 'none';

    if (tipo === 'Alumno/a' || tipo === 'Profesor/a') {
        document.getElementById('DNIusuario').style.display = 'block';
    } else if (tipo === 'Invitado/a') {
        document.getElementById('DNIusuario').style.display = 'block';
        document.getElementById('curso_usuario').style.display = 'flex';
        document.getElementById('NyAusuario').style.display = 'block';
    } else if (tipo === 'Admin') {
        document.getElementById('DNIusuario').style.display = 'block';
        document.getElementById('Claveadmin').style.display = 'block';
    }

    desplazarALaPagina('pagina3');
}

// Definir el tipo de usuario
document.getElementById('alumno').addEventListener('click', () => establecerTipoUsuario('Alumno/a'));
document.getElementById('profesor').addEventListener('click', () => establecerTipoUsuario('Profesor/a'));
document.getElementById('invitado').addEventListener('click', () => establecerTipoUsuario('Invitado/a'));
document.getElementById('admin').addEventListener('click', () => establecerTipoUsuario('Admin'));

// Botón de avanzar una vez que se ingresaron los datos
document.getElementById('btn_avanzar').addEventListener('click', function(event) {
    event.preventDefault();

    // Validar inputs según el tipo de usuario
    let valid = true;
    const dni = document.getElementById('DNIusuario').value;
    const nombreApellido = document.getElementById('NyAusuario').value;
    const claveAdmin = document.getElementById('Claveadmin').value;
    const curso = document.getElementById('curso_usuario');
    const division = document.getElementById('division');
    const especialidad = document.getElementById('especialidad');
    const botonAvanzar = document.getElementById('btn_avanzar');

    if (tipoUsuario === 'Alumno/a' || tipoUsuario === 'Profesor/a') {
        if (!dni) valid = false;
    } else if (tipoUsuario === 'Invitado/a') {
        if (!dni || !nombreApellido || curso.selectedIndex === 0 || division.selectedIndex === 0 || especialidad.selectedIndex === 0) valid = false;
    } else if (tipoUsuario === 'Admin') {
        if (!dni || !claveAdmin) valid = false;
    }

    if (valid) {
        desplazarALaPagina('pagina4');
    } else {
        // alert('Por favor, completa todos los campos necesarios.');

        if (botonAvanzar.classList.contains("shake")) {
            botonAvanzar.classList.remove('shake');
        }
        botonAvanzar.classList.add('shake');

        // Quitar la clase 'shake' después de 
        setTimeout(() => {
            botonAvanzar.classList.remove('shake');
        }, 2000);
    }
});

// Volver a la página anterior si falla la autenticación
document.getElementById('volver_a_intentar').addEventListener('click', function(event) {
    event.preventDefault();
    desplazarALaPagina('pagina4');
});

// Retirar o devolver computadora en la última página u opciones de admin
document.getElementById('retirar').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('devolver_compu').style.display = 'none';
    desplazarALaPagina('pagina6');
});

document.getElementById('devolver').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('retirar_compu').style.display = 'none';
    desplazarALaPagina('pagina6');
});

// Botón reinicio
document.getElementById('reiniciar').addEventListener('click', function(event) {
    event.preventDefault();
    location.reload();
});

// Botones home
document.querySelectorAll('.home').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        location.reload();
    });
});

// Botones back
document.getElementById('back2').addEventListener('click', function(event) {
    event.preventDefault();
    desplazarALaPagina('pagina1');
});

document.getElementById('back3').addEventListener('click', function(event) {
    event.preventDefault();
    desplazarALaPagina('pagina2');
});

document.getElementById('back4').addEventListener('click', function(event) {
    event.preventDefault();
    desplazarALaPagina('pagina3');
});

// Botón reinicio página admin 
document.getElementById('opcionesadmin_reiniciar').addEventListener('click', function(event) {
    event.preventDefault();
    location.reload();
});

// Funcionalidades de la API

const video = document.getElementById("video");
const overlayCanvas = document.getElementById("overlayCanvas");
const imageUpload = document.getElementById("imageUpload");
const capturedImage = document.getElementById("capturedImage");
const captureButton = document.getElementById("captureButton");
const compareButton = document.getElementById("compareButton");
const resultMessage = document.getElementById("resultMessage");

let uploadedFaceData;
let capturedFaceData;

document.addEventListener('DOMContentLoaded', async () => {
    // Cargar los modelos
    await faceapi.nets.ssdMobilenetv1.loadFromUri('./models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('./models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('./models');
    startVideo();
});

// Start the camera
function startVideo() {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.error("Error accessing the camera: ", err);
            alert("Could not access the camera.");
        });
}

// Handle image upload and face detection
imageUpload.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file) {
        const img = await faceapi.bufferToImage(file);
        uploadedImage.src = img.src;
        uploadedFaceData = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (!uploadedFaceData) {
            alert('No face detected in the uploaded image.');
        }
    }
});

// Capture photo from video feed
captureButton.addEventListener("click", async () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgDataUrl = canvas.toDataURL('image/jpeg');
    capturedImage.src = imgDataUrl;

    const img = await faceapi.fetchImage(imgDataUrl);
    capturedFaceData = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();

    if (!capturedFaceData) {
        alert('No face detected in the captured image.');
    }
});

// Compare faces using Euclidean distance
compareButton.addEventListener("click", async () => {
    if (!uploadedFaceData || !capturedFaceData) {
        alert("Both images need to be detected for comparison.");
        return;
    }

    // Calculate the Euclidean distance between the two face descriptors
    const distance = faceapi.euclideanDistance(uploadedFaceData.descriptor, capturedFaceData.descriptor);
    console.log("Distance between descriptors: ", distance);

    // Define a threshold (0.6 is a common threshold for face matching)
    const threshold = 0.4;
    const isSamePerson = distance < threshold;
    console.log("Is same person: ", isSamePerson);

    // Desplazarse a la página 5 y ocultar los elementos según el resultado
    desplazarALaPagina('pagina5');
    if (isSamePerson) {
        console.log("Las caras son las mismas.");
        document.getElementById('usuarioNOverificado_pagina5').style.display = 'none';
    } else {
        document.getElementById('usuarioverificado_pagina5').style.display = 'none';
    }
});
