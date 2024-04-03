const express = require("express");
const path = require('path');
const app = express();

// Puerto en el que se iniciará el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`El servidor está inicializado en el puerto ${PORT}`);
});

// Middleware para traer archivos estáticos desde la carpeta 'assets'
app.use(express.static(path.join(__dirname, 'assets')));

// Ruta raiz que redirige al archivo index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

// Lista de usuarios existentes
const usuarios = ['Juan', 'Jocelyn', 'Astrid', 'Maria', 'Ignacia', 'Javier', 'Brian'];

// Ruta para obtener la lista de usuarios en formato JSON
app.get('/abracadabra/usuarios', (req, res) => {
    res.json(usuarios);
});

// Middleware para verificar si el usuario existe
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const usuario = req.params.usuario;
    if (usuarios.includes(usuario)) {
        next(); // pasa al app.get
    } else {
        // Envía una imagen si el usuario no existe
        res.sendFile(path.join(__dirname, 'assets', 'who.jpeg'));
    }
});

// Ruta de bienvenida al juego para un usuario existente
app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.send('¡Bienvenido al juego!');
});

// Ruta para mostrar una imagen dependiendo de un número aleatorio
app.get('/abracadabra/conejo/:n', (req, res) => {
    const numeroAleatorio = Math.floor(Math.random() * 4) + 1;
    const n = parseInt(req.params.n);
    if (n === numeroAleatorio) {
        res.sendFile(path.join(__dirname, 'assets', 'conejito.jpg'));
    } else {
        res.sendFile(path.join(__dirname, 'assets', 'voldemort.jpg'));
    }
});

// Middleware para manejar rutas no definidas
app.use((req, res) => {
    res.send('Esta página no existe...');
});