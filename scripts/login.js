import { onEvent, sendEvent, startServer } from "soquetic";
import { ReadlineParser, SerialPort } from "serialport";
import fs from "fs";
import { join } from "path";
import readline from "readline";
import { on } from "events";

const usersFile = join("./json/usuarios.json");
const configFile = join("./json/config.json");
const carroFile = join("./json/carroData.json");

const port = new SerialPort({
    //Completar con el puerto correcto
    path: "COM4",
    baudRate: 9600,
});

const parser = new ReadlineParser();
port.pipe(parser);

port.on("open", () => {
    console.log("Puerto serial abierto");
});

function getPrimeraCompuParaAgarrar() {
    const data = JSON.parse(fs.readFileSync(carroFile, "utf-8")); // Parseamos el JSON a un objeto
    console.log(data.estadoRanuraCompus);

    if (data.estadoRanuraCompus["1"]) {
        console.log("Retira la compu 1");
        data.estadoRanuraCompus["1"] = false;
        fs.writeFileSync(carroFile, JSON.stringify(data, null, 2));

        return 1;
    } else if (data.estadoRanuraCompus["2"]) {
        console.log("Retira la compu 2");
        data.estadoRanuraCompus["2"] = false;
        fs.writeFileSync(carroFile, JSON.stringify(data, null, 2));

        return 2;
    } else {
        console.log("No hay compus");
        return -1;
    }
}

onEvent("ranuraCompuRetirar", () => {
    const n = getPrimeraCompuParaAgarrar();
    enviarDatosArduino("open:" + n)
    return n;
});

function getPrimeraCompuParaDevolver() {
    const data = JSON.parse(fs.readFileSync(carroFile, "utf-8")); // Parseamos el JSON a un objeto

    if (!data.estadoRanuraCompus["1"]) {
        console.log("Guarda la compu en 1");
        data.estadoRanuraCompus["1"] = true;
        fs.writeFileSync(carroFile, JSON.stringify(data, null, 2));

        return 1;
    } else if (!data.estadoRanuraCompus["2"]) {
        console.log("Guarda la compu en 2");
        data.estadoRanuraCompus["2"] = true;
        fs.writeFileSync(carroFile, JSON.stringify(data, null, 2));

        return 2;
    } else {
        console.log("No hay espacios para guardar tu compu.");
        return -1;
    }
}

onEvent("ranuraCompuDevolver", () => {
    const n = getPrimeraCompuParaDevolver();
    enviarDatosArduino("open:" + n)
    return n;
});


function cargarUsuarios() {
    const data = fs.readFileSync(usersFile, "utf-8");
    return JSON.parse(data);
}

function cargarConfig() {
    const data = fs.readFileSync(configFile, "utf-8");
    return JSON.parse(data);
}

function verificarUsuario(dni) {
    const usuarios = cargarUsuarios();
    return usuarios.find((usuario) => usuario.dni === dni);
}

const respuesta = verificarUsuario();

function manejarLogin(dni) {
    console.log(`Verificando DNI: ${dni}`);
    const usuario = verificarUsuario(dni);

    if (usuario) {
        enviarRespuestaLogin(true, usuario);
    } else {
        enviarRespuestaLogin(false);
    }
}

function enviarRespuestaLogin(exito, usuario = null) {
    if (exito) {
        console.log({ mensaje: "Inicio de sesión exitoso", usuario });
        sendEvent("loginSuccess", {
            mensaje: "Inicio de sesión exitoso",
            usuario,
        });
    } else {
        console.log({ mensaje: "DNI no encontrado" });
        sendEvent("loginError", { mensaje: "DNI no encontrado" });
    }
}

function configurarEventos() {
    onEvent("login", ({ dni }) => {
        console.log(`Evento de login recibido: ${dni}`);
        manejarLogin(dni);
    });
}

function iniciarServidor() {
    startServer(3000, () => {
        console.log("Servidor iniciado en el puerto 3000");
    });
}

function iniciarModoPrueba() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question("Ingrese el DNI para probar el login: ", (dni) => {
        manejarLogin(dni);
        rl.close();
    });
}

function devolverNombre(dni) {
    const users = cargarUsuarios();
    const userFind = users.find((usuario) => usuario.dni === dni);
    if (!userFind) return;
    console.log(userFind.nombre);
    return userFind.nombre;
}

function manejarRanuraCompu() {
    const config = cargarConfig();
    let compuAsignada = null;
    let haCambiado = false;

    if (config.cantidadCompus > 0) {  // Retirar computadora
        if (!config.compu1EnCarro) {
            compuAsignada = 1;
            config.compu1EnCarro = true;
            haCambiado = true;
        } else if (!config.compu2EnCarro) {
            compuAsignada = 2;
            config.compu2EnCarro = true;
            haCambiado = true;
        }
        config.cantidadCompus--; // Reducir la cantidad de computadoras disponibles
    } else {  // Devolver computadora
        if (config.compu1EnCarro) {
            compuAsignada = 1;
            config.compu1EnCarro = false;
            haCambiado = true;
        } else if (config.compu2EnCarro) {
            compuAsignada = 2;
            config.compu2EnCarro = false;
            haCambiado = true;
        }
        config.cantidadCompus++; // Aumentar la cantidad de computadoras disponibles
    }

    // Solo guarda cambios si ha habido modificaciones
    if (haCambiado) {
        fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
    }

    return compuAsignada;
}

onEvent("getNombre", (data) => {
    console.log(data);
    return devolverNombre(data.dni);
});

onEvent("cantidadCompus", () => {
    const config = cargarConfig();
    return config.cantidadCompus;
});

onEvent("imagen", (data) => {
    console.log(data.dni)
    const users = cargarUsuarios();
    const userFind = users.find((usuario) => usuario.dni === data.dni);
    if (!userFind) return;
    console.log("Hay imagen")
    return userFind.imagen;
});

onEvent("verificarSoqueTic", () => {
    return true;
});


onEvent("overlayCamara", (data) => {
    const config = cargarConfig()
    return config.mostarOverlay;
});

onEvent("overlayCamaraTrue", (data) => {
    const config = cargarConfig();
    config.mostrarOverlay = true;
});

onEvent("overlayCamaraFalse", (data) => {
    const config = cargarConfig();
    config.mostrarOverlay = false;
});

onEvent("animacionesPaginas", (data) => {
    const config = cargarConfig()
    return config.desactivarAnimaciones;
});


onEvent("ranuraCompu", (data) => {
    const compuAsignada = manejarRanuraCompu(); // Llamada a la función para obtener la computadora asignada
    if (compuAsignada) {
        enviarDatosArduino("d")

        return sendEvent("compuAsignada", {
            mensaje: `Computadora asignada: ${compuAsignada}`,
            numeroCompu: compuAsignada
        });
    } else {
        return sendEvent("error", {
            mensaje: "No hay computadoras disponibles para asignar o recibir"
        });
    }
});

function enviarDatosArduino(msg) {
    console.log("datos enviados: " + msg)
    port.write(msg)
}


// onEvent("abrirHardware", () => {
//     enviarDatosArduino("d")
// })

// Ver la data que LLEGA del Hardware (no anda)
port.on("open", () => {
    console.log("Puerto serial abierto");
});

let sensor1 = false;
let sensor2 = false;

parser.on("data", function (status) {
    console.log("Respuesta recibida del Arduino:", status.trim());
    const sensor = status.trim().split(":")[0];
    const value = status.trim().split(":")[1] == "ABIERTO";
    if (status.trim() == "Sensores:CERRADOS") {
        sensor1 = false;
        sensor2 = false;
    }
    else if (sensor == "Sensor1") {
        sensor1 = value;
        sensor2 = false;
    }
    else if (sensor == "Sensor2") {
        sensor1 = false;
        sensor2 = value;
    }
    console.log({
        sensor1,
        sensor2
    })
    if (!sensor1) {
        console.log("Se saco la compu 1");
    }

    if (!sensor2) {
        console.log("Se saco la compu 2");
    }

});



// Iniciar el servidor
iniciarServidor();
