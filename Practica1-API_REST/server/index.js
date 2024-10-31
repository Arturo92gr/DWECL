const express = require('express');
const cors = require('cors');
const path = require('path');     // Para los archivos estáticos
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Para el parseo
app.use(express.static(path.join(__dirname, '../client')));     // Servir archivos estáticos (index.html / index.js de cliente)

const notesList = [];

// Obtener
app.get('/notes', (req, res) => {
    res.json(notesList);
});

// Añadir
app.post('/notes', (req, res) => {
    const { type, content } = req.body;
    const newNote = {                           // Nueva nota con tipo, contenido y fecha de creación autoasignada
        id: notesList.length + 1,
        type,
        content,
        creationDate: new Date().toISOString()
    };
    notesList.push(newNote);                    // Agregar nota
    res.status(201).json(newNote);
});

app.listen(port, () => {
  console.log('Servidor listo en el puerto ' + port);
});