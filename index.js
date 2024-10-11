const fs = require('fs');
const path = require('path');

// Definir la ruta para el almacenamiento JSON
const filePath = path.join(__dirname, 'usuarios.json');

// Función para leer los usuarios existentes del archivo JSON
function leerUsuarios() {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return data ? JSON.parse(data) : [];
}

// Función para guardar los usuarios en el archivo JSON
function guardarUsuarios(usuarios) {
  fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));
}

// Función para agregar un nuevo usuario
function agregarUsuario(tipoUsuario, datosUsuario) {
  let nuevoUsuario = {
    tipo: tipoUsuario,
    ...datosUsuario,
  };

  const usuarios = leerUsuarios();
  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);
  console.log('Usuario agregado:', nuevoUsuario);
}

// Función para verificar el login
function verificarLogin(usuario, contrasena) {
  const usuarios = leerUsuarios();
  const usuarioEncontrado = usuarios.find(
    (user) => user.usuario === usuario && user.contrasena === contrasena
  );

  if (usuarioEncontrado) {
    console.log('Login correcto:', usuario);
    return true;
  } else {
    console.log('Login incorrecto');
    return false;
  }
}

// Ejemplo de uso para agregar usuarios
agregarUsuario('Invitado/a', {
  usuario: 'invitado1',
  contrasena: 'password123',
  dni: '12345678',
  nombre: 'Juan',
  apellido: 'Perez',
  division: '1B',
  especialidad: 'Informatica'
});

agregarUsuario('Profesor/a', {
  dni: '87654321'
});

agregarUsuario('Admin', {
  usuario: 'admin1',
  contrasena: 'adminPassword',
  dni: '11223344',
  claveAdmin: 'claveAdmin123'
});

agregarUsuario('Alumno/a', {
  dni: '55667788'
});

agregarUsuario('Profesor/a', {
  dni: '99887766'
});

// Ejemplo de uso para verificar login
verificarLogin('invitado1', 'password123');
verificarLogin('admin1', 'wrongPassword');