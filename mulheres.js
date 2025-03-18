const express = require("express") //aqui estou iniciando o express
const router = express.Router() //aqui estou configurando a primeira parte da rota
const cors = require('cors') // aqui estou trazendo o pacote cors que permite consumir essa api no front-end
const conectaBancoDeDados = require('./bancoDeDados') //aqui estou ligando ao arquivo bancoDeDados
conectaBancoDeDados() // estou chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() //aqui estou iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 //aqui estou criando a porta

// GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find();
        response.json(mulheresVindasDoBancoDeDados);
    } catch (erro) {
        console.log(erro);
        response.status(500).send(erro);
    }
}

// POST
async function criaMulher(request, response) {
    try {
        const novaMulher = new Mulher({
            nome: request.body.nome,
            imagem: request.body.imagem,
            citacao: request.body.citacao,
            minibio: request.body.minibio,
        });

        const mulherSalva = await novaMulher.save();
        response.status(201).json(mulherSalva);
    } catch (erro) {
        console.log(erro);
        response.status(400).send(erro);
    }
}

// PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id);

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome;
        }
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio;
        }
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem;
        }
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao;
        }

        const mulherAtualizada = await mulherEncontrada.save();
        response.json(mulherAtualizada);
    } catch (erro) {
        console.log(erro);
        response.status(500).send(erro);
    }
}

// DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id);
        response.json({ mensagem: 'Mulher deletada com sucesso!' });
    } catch (erro) {
        console.log(erro);
        response.status(500).send(erro);
    }
}

// ROTAS
app.get('/mulheres', mostraMulheres); // Definindo a rota GET
app.post('/mulheres', criaMulher); // Definindo a rota POST
app.patch('/mulheres/:id', corrigeMulher); // Definindo a
