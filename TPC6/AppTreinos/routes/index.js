var express = require('express');
var router = express.Router();
var Treino = require('../controllers/treino')

/* GET home page. */
router.get('/treinos', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Treino.list()
    .then(dados => {
      res.status(201).json(dados);
    })
    .catch(erro => {
      res.status(601).json(erro);
    })
});

/* GET Modalidades page. */
router.get('/treinos/modalidades', function(req, res, next) {
  Treino.getModalidades()
    .then(dados => { 
      res.status(201).json(dados)
    })
    .catch(erro => {res.status(606).json(erro);})
});

router.get('/treinos/duracao', function(req, res, next) {
  Treino.getDuracaoTotal()
    .then(dados => {
      acc = 0
      for(let i=0; i<dados.length; i++){
          acc += dados[i]
      }
      res.status(201).json(acc)
    })
    .catch(erro => {res.status(607).json(erro);})
});

router.get('/treinos/atletas', function(req, res, next) {
  Treino.getAtletas()
    .then(dados => {res.status(201).json(dados)})
    .catch(erro => {res.status(608).json(erro);})
});


/* GET Treino page. */
router.get('/treinos/:idTreino', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Treino.getTreino(req.params.idTreino)
    .then(dados => {res.status(201).json(dados)})
    .catch(erro => {res.status(602).json(erro);})
});

/* POST Treino */
router.post('/treinos', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Treino.addTreino(req.body)
    .then(dados => {
      res.status(201).json(dados)
    })
    .catch(erro => {
      res.status(603).json(erro)
    })
});

/* POST Treino */
router.put('/treinos/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Treino.updateTreino(req.body)
    .then(dados => {
      res.status(201).json(dados)
    })
    .catch(erro => {
      res.status(604).json(erro)
    })
});

/* DELETE Treino */
router.delete('/treinos/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Treino.deleteTreino(req.params.id)
    .then(dados => {
      res.status(201).json(dados)
    })
    .catch(erro => {
      res.status(605).json(erro)
    })
});


module.exports = router;
