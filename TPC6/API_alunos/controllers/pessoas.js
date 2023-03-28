var Pessoa = require('../models/pessoas')

//  Pessoa list
module.exports.list = () => {
    return  Pessoa.find()
        .sort({nome:-1})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getPessoa = id => {
    return  Pessoa.findOne({_id: id})
    .then(dados => {
        return dados
      })
    .catch(erro => {
        return erro
    })
}

module.exports.addPessoa = pessoa => {
    return  Pessoa.create(pessoa)
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.addPessoas = lista => {
    return  Pessoa.insertMany(lista)
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.updatePessoa = t => {
    return  Pessoa.updateOne({_id: t._id}, t)
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.deletePessoa = id => {
    return  Pessoa.deleteOne({_id: id})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}