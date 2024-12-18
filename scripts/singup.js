import { onEvent, sendEvent, startServer } from "soquetic";
import { readFileSync, writeFileSync } from "fs";

function register(data) {
    let usuariosActuales = [];
    try {
        const datosJSON = readFileSync("./users.json", 'utf-8');
        usuariosActuales = JSON.parse(datosJSON);

        if (!Array.isArray(usuariosActuales)) {
            usuariosActuales = [];
        }
    } catch (error) {
        console.log("Error al leer el archivo o archivo inexistente, creando uno nuevo.");
    }

    usuariosActuales.push(data);

    const info = JSON.stringify(usuariosActuales, null, 2);
    writeFileSync("./users.json", info);

    console.log("Nuevo usuario registrado!");

}

onEvent("createUser", (data) => {
    console.log(data);
    register(data);
})

startServer(3000);