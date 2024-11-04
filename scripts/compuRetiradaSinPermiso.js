var compuMalSacada;
fetchData("compuRetiradaSinPermiso", (data) => {
    compuMalSacada = data;
    if (compuMalSacada == true) {
        document.getElementById("compuRetiradaSinPermiso").style.display = "flex";
        document.getElementById("compuRetiradaSinPermiso").classList.add("opacidad_blur");
    } else {
        document.getElementById("compuRetiradaSinPermiso").classList.add("opacidad_blur_fade");
        document.getElementById("compuRetiradaSinPermiso").style.display = "none";
    }
});
