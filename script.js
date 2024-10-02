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
        document.getElementById('opcionesadmin').style.display = 'flex';
        document.getElementById('contenedor_pagina6').style.display = 'none';
        document.getElementById('pagina4').style.display = 'none';
        document.getElementById('pagina5').style.display = 'none';
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

    let valid = true;
    const dni = document.getElementById('DNIusuario').value.trim();
    const nombreApellido = document.getElementById('NyAusuario').value.trim();
    const claveAdmin = document.getElementById('Claveadmin').value.trim();
    const curso = document.getElementById('curso_usuario');
    const division = document.getElementById('division');
    const especialidad = document.getElementById('especialidad');
    const botonAvanzar = document.getElementById('btn_avanzar');

    // Resetear la clase 'incompleto' de todos los campos
    document.querySelectorAll('.incompleto').forEach(el => el.classList.remove('incompleto'));

    if (tipoUsuario === 'Alumno/a' || tipoUsuario === 'Profesor/a') {
        if (!dni) {
            valid = false;
            document.getElementById('DNIusuario').classList.add('incompleto'); 
        }
    } else if (tipoUsuario === 'Invitado/a') {
        if (!dni) {
            valid = false;
            document.getElementById('DNIusuario').classList.add('incompleto');
        }
        if (!nombreApellido) {
            valid = false;
            document.getElementById('NyAusuario').classList.add('incompleto');
        }
        if (curso.selectedIndex === 0) {
            valid = false;
            curso.classList.add('incompleto');
        }
        if (division.selectedIndex === 0) {
            valid = false;
            division.classList.add('incompleto');
        }
        if (especialidad.selectedIndex === 0) {
            valid = false;
            especialidad.classList.add('incompleto');
        }
    } else if (tipoUsuario === 'Admin') {
        if (!dni) {
            valid = false;
            document.getElementById('DNIusuario').classList.add('incompleto');
        }
        if (!claveAdmin) {
            valid = false;
            document.getElementById('Claveadmin').classList.add('incompleto');
        }
    }

    if (valid) {
        // Verificar a qué página debe avanzar según el tipo de usuario
        if (tipoUsuario === 'Admin') {
            desplazarALaPagina('pagina6');  
        } else if (tipoUsuario === 'Alumno/a' || tipoUsuario === 'Profesor/a') {
            desplazarALaPagina('pagina4');  
        } else if (tipoUsuario === 'Invitado/a') {
            desplazarALaPagina('pagina5'); 
        }
    } else {
        if (botonAvanzar.classList.contains("shake")) {
            botonAvanzar.classList.remove('shake');
        }
        botonAvanzar.classList.add('shake');

        // Quitar la clase 'shake' después de 2 segundos
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

// Funcionalidad api
const video = document.getElementById("video");
const overlayCanvas = document.getElementById("overlayCanvas");
const imageUpload = document.getElementById("imageUpload");
const capturedImage = document.getElementById("capturedImage");
const captureButton = document.getElementById("captureButton");

let uploadedFaceData;
let capturedFaceData;

// Esperar a que se cargue el DOM
document.addEventListener('DOMContentLoaded', async () => {
    // Cargar los modelos de face-api.js
    await faceapi.nets.tinyFaceDetector.loadFromUri('./models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('./models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('./models');
    startVideo();
});

// Opciones para tinyFaceDetector
const tinyFaceDetectorOptions = new faceapi.TinyFaceDetectorOptions({
    inputSize: 160, // Puedes ajustar este valor para mejorar el rendimiento
    scoreThreshold: 0.5 // Puedes ajustar este valor para controlar la sensibilidad
});

// Iniciar la cámara con resolución predeterminada (puedes ajustar la resolución aquí si lo prefieres)
function startVideo() {
    navigator.mediaDevices
        .getUserMedia({ video: true })  // Agrega una resolución si lo necesitas, ej: { width: 1280, height: 720 }
        .then((stream) => {
            video.srcObject = stream;
            video.addEventListener('play', () => {
                // Sincronizar el canvas con el video
                const canvas = faceapi.createCanvasFromMedia(video);
                document.body.append(canvas);
                const displaySize = { width: video.videoWidth, height: video.videoHeight };
                faceapi.matchDimensions(overlayCanvas, displaySize);
                setInterval(async () => {
                    const detections = await faceapi.detectAllFaces(video, tinyFaceDetectorOptions).withFaceLandmarks().withFaceDescriptors();
                    const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    overlayCanvas.getContext('2d').clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
                    faceapi.draw.drawDetections(overlayCanvas, resizedDetections);
                    faceapi.draw.drawFaceLandmarks(overlayCanvas, resizedDetections);
                }, 100);
            });
        })
        .catch((err) => {
            console.error("Error accessing the camera: ", err);
            alert("Could not access the camera.");
        });
}

// Capturar foto del video con resolución 1920x1080
captureButton.addEventListener("click", async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1920;  // Ajuste a 1920 de ancho
    canvas.height = 1080; // Ajuste a 1080 de alto
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgDataUrl = canvas.toDataURL('image/jpeg');
    capturedImage.src = imgDataUrl;

    const img = await faceapi.fetchImage(imgDataUrl);
    capturedFaceData = await faceapi
        .detectSingleFace(img, tinyFaceDetectorOptions)
        .withFaceLandmarks()
        .withFaceDescriptor();

    if (!capturedFaceData) {
        alert('No se detectó ninguna cara en la foto');
        return;
    }

    // Comparar las caras
    if (!uploadedFaceData || !capturedFaceData) {
        alert("Ambas imágenes necesitan ser detectadas para la comparación.");
        return;
    }

    const distance = faceapi.euclideanDistance(uploadedFaceData.descriptor, capturedFaceData.descriptor);
    const threshold = 0.4;
    const isSamePerson = distance < threshold;

    // Navegar a la página 5 según el resultado
    desplazarALaPagina('pagina5');
    if (isSamePerson) {
        document.getElementById('usuarioNOverificado_pagina5').style.display = 'none';
        document.getElementById('usuarioverificado_pagina5').style.display = 'flex';
    } else {
        document.getElementById('usuarioverificado_pagina5').style.display = 'none';
        document.getElementById('usuarioNOverificado_pagina5').style.display = 'flex';
    }
});

// Subir imagen para comparación
imageUpload.addEventListener('change', async (event) => {
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
        alert('No se detectó ninguna cara en la imagen subida');
        return;
    }
});
