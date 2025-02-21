const express = require('express');
const router = express.Router();
const app = express();
const porta = 3333;

const hora = new Date().getHours();
const minuto = new Date().getMinutes();
const segundo = new Date().getSeconds();

function mostraHora(request, response) {
  response.json({
    hora: hora,
    minuto: minuto,
    segundo: segundo
  });
}

function mostraPorta() {
  console.log(`Servidor rodando na porta ${porta}`);
}
app.use(router.get('/hora', mostraHora));
app.listen(porta, mostraPorta);