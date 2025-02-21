const express = require('express');
const router = express.Router();
const app = express();
const porta = 3333;

function mostraMulher(request, response) {
    response.json({
        nome: 'Ana Carolina Franco Martins',
        imagem: "https://photos.fife.usercontent.google.com/pw/AP1GczPMyVx1nQyIbRXHwr4hjbbCrBWg2c0rnVJKptSUK7wwYoSA1I2NQWoLgA=w689-h919-s-no-gm?authuser=0",
        idade: 44, 
        profissao: 'Gestora de TI'
    })
}
function mostraPorta() {
  console.log(`Servidor rodando na porta ${porta}`);
}

app.use(router.get('/mulher', mostraMulher));
app.listen(porta, mostraPorta);