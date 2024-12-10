var compuMalSacada;

function reproducirSirena() {
    let sirenaAudio = document.getElementById("sirenaAudio");

    if (!sirenaAudio) {
        sirenaAudio = document.createElement("audio");
        sirenaAudio.id = "sirenaAudio";

        const source = document.createElement("source");
        source.src = "media/sirena.mp3";
        source.type = "audio/mpeg";

        sirenaAudio.appendChild(source);
        document.body.appendChild(sirenaAudio);
    }

    sirenaAudio.currentTime = 0;
    sirenaAudio.loop = true;
    sirenaAudio.play();
}

function detenerSirena() {
    const sirenaAudio = document.getElementById("sirenaAudio");
    if (sirenaAudio) {
        sirenaAudio.pause();
        sirenaAudio.currentTime = 0;
    }
}

fetchData("compuRetiradaSinPermiso", (data) => {
    compuMalSacada = data;

    const compuElement = document.getElementById("compuRetiradaSinPermiso");

    if (compuMalSacada === true) {
        compuElement.style.display = "flex";
        compuElement.classList.add("opacidad_blur");
        reproducirSirena();
    } else {
        compuElement.classList.add("opacidad_blur_fade");
        compuElement.style.display = "none";
        detenerSirena();
    }
});
