var mongoose = require('mongoose')

var treinosSchema = new mongoose.Schema({
    _id: String,
    nome: String,
    modalidade: String,
    duracao: Number,
    data: String
})

module.exports = mongoose.model('treinos', treinosSchema)