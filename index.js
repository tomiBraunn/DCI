import { onEvent, sendEvent, startServer } from 'soquetic';
import fs from 'fs';

// Cargar usuarios del archivo JSON
const cargarUsuarios = () => {
  const data = fs.readFileSync('usuarios.json', 'utf8');
  return JSON.parse(data);
};

// Leer usuarios al inicio
let usuarios = cargarUsuarios();

// Evento para verificar si el usuario está en la lista de usuarios
onEvent('verificarUsuario', ({ tipoUsuario, dni }) => {
  const usuarioEncontrado = usuarios.find(
    (user) => user.dni === dni && user.tipoUsuario === tipoUsuario
  );

  if (usuarioEncontrado) {
    return { exito: true, usuario: usuarioEncontrado };
  } else {
    return { exito: false };
  }
});

// Evento para simular desconexión (no es necesario realmente en SoqueTIC)
onEvent('disconnect', () => {
  console.log('Usuario desconectado');
});

// Iniciar el servidor SoqueTIC
startServer(3000); // Puedes cambiar el puerto si lo deseas
