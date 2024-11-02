var cantidadCompus;

fetchData("cantidadCompus", (data) => {
    cantidadCompus = data;
    document.getElementById("cantidad_compus").innerHTML = data;
    actualizarDisponibilidad();
});

// Función para actualizar la disponibilidad de los botones
function actualizarDisponibilidad() {
    const botonRetirar = document.getElementById("retirar");
    const botonDevolver = document.getElementById("devolver");
    console.log("Hay " + cantidadCompus + " compus en el carro");

    // Deshabilitar "Devolver computadora" si cantidadCompus es 2
    if (cantidadCompus >= 2) {
        botonDevolver.classList.add("noDisponible");
    } else {
        botonDevolver.classList.remove("noDisponible");
        console.log("se devolvio una compu");
    }

    // Deshabilitar "Retirar computadora" si cantidadCompus es 0
    if (cantidadCompus <= 0) {
        botonRetirar.classList.add("noDisponible");
    } else {
        botonRetirar.classList.remove("noDisponible");
    }

    // postData(actualizarCantidadCompus,

    // )
}
document.addEventListener("DOMContentLoaded", actualizarDisponibilidad);

var ranuraCompuDevolver;
var ranuraCompuRetirar;

// Retirar computadora
document.getElementById("retirar").addEventListener("click", function (event) {
    const botonRetirar = document.getElementById("retirar");

    if (botonRetirar.classList.contains("noDisponible")) {
        event.preventDefault();
        botonRetirar.classList.add("shake");
        setTimeout(() => {
            botonRetirar.classList.remove("shake");
        }, 500);

        return;
    }

    // Resta uno a cantidadCompus y actualiza la disponibilidad
    cantidadCompus--;
    actualizarDisponibilidad();
    fetchData("ranuraCompuRetirar", (data) => {
        ranuraCompuRetirar = data;
        document.getElementById("ranuraRetirar").value = data;

    })

    event.preventDefault();
    document.getElementById("devolver_compu").style.display = "none";
    desplazarALaPagina("pagina6");
});

// Devolver computadora
document.getElementById("devolver").addEventListener("click", function (event) {
    const botonDevolver = document.getElementById("devolver");

    if (botonDevolver.classList.contains("noDisponible")) {
        event.preventDefault();
        botonDevolver.classList.add("shake");
        setTimeout(() => {
            botonDevolver.classList.remove("shake");
        }, 500);

        return;
    }

    // Suma uno a cantidadCompus y actualiza la disponibilidad
    cantidadCompus++;
    actualizarDisponibilidad();
    fetchData("ranuraCompuDevolver", (data) => {
        ranuraCompuDevolver = data;
        document.getElementById("ranuraDevolver").value = data;
    })

    // Mostrar que compu retirar
    fetchData("verificarSoqueTic", (data) => {
        soquetic = data;
    });


    event.preventDefault();
    document.getElementById("retirar_compu").style.display = "none";
    desplazarALaPagina("pagina6");
});

// var ranuraCompu;

// fetchData("ranuraCompu", (data) => {
//     ranuraCompu = data;
//     console.log("se realizo una operacion en la ranura" + ranuraCompu)
// });
