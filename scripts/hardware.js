import { parse } from "path/posix";
import { ReadlineParser, SerialPort } from "serialport";
import { onEvent } from "soquetic";

const port = new SerialPort({
    //Completar con el puerto correcto
    path: "COM3",
    baudRate: 9600,
});

const parser = new ReadlineParser();
port.pipe(parser);

export function enviarDatosArduino(msg) {
    console.log("datos enviados: " + msg)
    port.write(msg)
}

export function leerData() {
    let data = port.read();
    console.log(data);

}

port.on("open", () => {
    console.log("Puerto serial abierto");
});


parser.on("data", function (status) {
    console.log("Respuesta recibida del Arduino:", status.trim());

});
