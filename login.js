import { onEvent, sendEvent, startServer } from "soquetic";
import fs from "fs";
import { join } from "path";
import readline from "readline";

const usersFile = join("usuarios.json");

function cargarUsuarios() {
  const data = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(data);
}

function verificarUsuario(dni) {
  const usuarios = cargarUsuarios();
  return usuarios.find(usuario => usuario.dni === dni);
}

function manejarLogin(dni) {
  console.log(`Verificando DNI: ${dni}`); // Agregar un log para verificar si se ejecuta
  const usuario = verificarUsuario(dni);
  
  if (usuario) {
    enviarRespuestaLogin(true, usuario);
  } else {
    enviarRespuestaLogin(false);
  }
}

function enviarRespuestaLogin(exito, usuario = null) {
  if (exito) {
    console.log({ mensaje: "Inicio de sesión exitoso", usuario }); // Mostrar resultado en consola
    sendEvent("loginSuccess", { mensaje: "Inicio de sesión exitoso", usuario });
  } else {
    console.log({ mensaje: "DNI no encontrado" }); // Mostrar resultado en consola
    sendEvent("loginError", { mensaje: "DNI no encontrado" });
  }
}

function configurarEventos() {
  onEvent("login", ({ dni }) => {
    console.log(`Evento de login recibido: ${dni}`); // Agregar un log para confirmar el evento
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
    output: process.stdout
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

main();

function devolverdni () {
    return (dni);
}

onEvent ("dni", devolverdni );

function devolvernombre () {
    return (nombre);
}

onEvent ("nombre", devolvernombre );

