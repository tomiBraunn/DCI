import { onEvent, sendEvent, startServer } from "soquetic";
import fs from "fs";
import { join } from "path";
import readline from "readline";

const usersFile = join("usuarios.json");
const configFile = join("config.json");

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

function main() {
    const modoPrueba = process.argv.includes("--prueba");

    if (modoPrueba) {
        iniciarModoPrueba();
    } else {
        configurarEventos();
        iniciarServidor();
    }
}

function devolverNombre(dni) {
    const users = cargarUsuarios();
    const userFind = users.find((usuario) => usuario.dni === dni);
    if (!userFind) return;
    console.log(userFind.nombre);
    return userFind.nombre;
}

onEvent("getNombre", (data) => {
    console.log(data);
    return devolverNombre(data.dni);
});

// Leer la cantidad de computadoras desde el archivo de configuración
onEvent("cantidadCompus", () => {
    const config = cargarConfig();
    return config.cantidadCompus; // Retorna el valor desde config.json
});

onEvent("imagen", (data) => {
    console.log(data.dni)
    const users = cargarUsuarios();
    const userFind = users.find((usuario) => usuario.dni === data.dni);
    if (!userFind) return;
    console.log("Hay imagen")
    return userFind.imagen;
});

// Iniciar el servidor
iniciarServidor();
