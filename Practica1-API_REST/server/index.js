const express = require('express');
const cors = require('cors');
const path = require('path');                                                   // Para los archivos estáticos
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());                                                        // Para el parseo
app.use(express.static(path.join(__dirname, '../client')));                     // Servir archivos estáticos (index.html / index.js de cliente)

// Configuración de la conexión a MongoDB
const mongoURI = 'mongodb+srv://acarmar248:Y3oqCKlFh6HMrm3a@clusternotes.s1pef.mongodb.net/?retryWrites=true&w=majority&appName=ClusterNotes';
mongoose.connect(mongoURI)
    .then(() => console.log('Conectado a la base de datos MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

// Modelo de Mongoose para las Notas
const noteSchema = new mongoose.Schema({
    type: { type: String, required: true },
    content: { type: String, required: true },
    creationDate: { type: Date, default: Date.now }
});
const Note = mongoose.model('Note', noteSchema);                                // Crear el modelo Note

const notesList = [];

// Obtener
app.get('/notes', async (req, res) => {
    try {
        const { month } = req.query;
        let filter = {};

        if (month) {
            const start = new Date(new Date().getFullYear(), month - 1, 1);     // Primer día del mes
            const end = new Date(new Date().getFullYear(), month, 1);           // Primer día del siguiente mes
            filter.creationDate = { $gte: start, $lt: end };
        }

        const notes = await Note.find(filter);                                  // Consulta con filtro si se proporciona
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las notas' });
    }
});

// Añadir
app.post('/notes', async (req, res) => {
    const { type, content } = req.body;

    try {
        const newNote = new Note({ type, content });
        await newNote.save();                                                   // Guardar en BD
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la nota' });
    }
});

app.listen(port, () => {
  console.log('Servidor listo en el puerto ' + port);
});