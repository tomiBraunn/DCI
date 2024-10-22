import { onEvent, sendEvent, startServer } from "soquetic";
import fs from "fs";

// Ruta del archivo JSON donde se guardarán los usuarios
const usersFile = './users.json';

// Función para leer el archivo JSON
const readUsersFromFile = () => {
  try {
    const data = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error leyendo el archivo JSON:", error);
    return [];
  }
};

// Función para escribir en el archivo JSON
const writeUsersToFile = (users) => {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    console.error("Error escribiendo en el archivo JSON:", error);
  }
};

// Evento para agregar un nuevo usuario
onEvent("addUser", (data) => {
  const { tipoUsuario, dni, nombre, apellido } = data;

  const newUser = {
    id: uuidv4(), // Genera un ID único
    tipoUsuario,
    dni,
    nombre,
    apellido
  };

  const users = readUsersFromFile();
  users.push(newUser);
  writeUsersToFile(users);

  console.log("Usuario agregado:", newUser);
  return { msg: "Usuario agregado exitosamente", user: newUser };
});

// Evento para obtener todos los usuarios
onEvent("getUsers", () => {
  const users = readUsersFromFile();
  return users;
});

// Evento para obtener un usuario por su ID
onEvent("getUserById", (data) => {
  const { id } = data;
  const users = readUsersFromFile();
  const user = users.find(u => u.id === id);
  
  if (user) {
    return user;
  } else {
    return { msg: "Usuario no encontrado" };
  }
});

// Ejemplo adicional: Fecha
onEvent("date", () => {
  const date = new Date();
  return `${date.getUTCDate()}/${date.getUTCMonth() + 1}`;
});

// Envío de eventos periódicos
setInterval(() => {
  sendEvent("second", null);
}, 1000);

startServer();
