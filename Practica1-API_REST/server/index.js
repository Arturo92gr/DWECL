const express = require('express');
const cors = require('cors');
const path = require('path');     // Para los archivos estáticos
const app = express();
const port = 3000;

app.use(cors());

// Servir archivos estáticos (index.html / index.js de cliente)
app.use(express.static(path.join(__dirname, '../client')));

app.get('/saludos', (req, res) => {
  const saludo = {
  lista: [
    { saludo0: 'Bienvenido Nº0' },
    { saludo1: 'Bienvenido Nº1' },
    { saludo2: 'Bienvenido Nº2' }
  ]
};
  res.json(saludo)
});

app.listen(port, () => {
  console.log('Servidor listo en el puerto ' + port);
});
