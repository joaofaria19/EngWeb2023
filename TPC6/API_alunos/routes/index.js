var express = require('express');
var router = express.Router();
var Pessoas = require('../controllers/pessoas')

/* GET Pessoas List */
router.get('/pessoas', function(req, res, next) {
  Pessoas.list()
    .then(dados => {res.status(201).json(dados);})
    .catch(erro => {res.status(601).json(erro);})
});

/* GET Pessoa */
router.get('/pessoas/:idPessoa', function(req, res, next) {
  Pessoas.getPessoa(req.params.idPessoa)
    .then(dados => {res.status(201).json(dados)})
    .catch(erro => {res.status(602).json(erro);})
});

/* POST Pessoa */
router.post('/pessoas', function(req, res, next) {
  Pessoas.addPessoa(req.body)
    .then(dados => {res.status(201).json(dados)})
    .catch(erro => {res.status(603).json(erro)})
});

/* POST Pessoas */
router.post('/pessoas/lista', function(req, res, next) {
  Pessoas.addPessoas(req.body)
    .then(dados => {res.status(201).json(dados)})
    .catch(erro => {res.status(603).json(erro)})
});

/* PUT Pessoa */
router.put('/pessoas/:id', function(req, res, next) {
  Pessoas.updatePessoa(req.body)
    .then(dados => {res.status(201).json(dados)})
    .catch(erro => {res.status(604).json(erro)})
});

/* DELETE Pessoa */
router.delete('/pessoas/:id', function(req, res, next) {
  Pessoas.deletePessoa(req.params.id)
    .then(dados => {res.status(201).json(dados)})
    .catch(erro => {res.status(605).json(erro)})
});


module.exports = router;
