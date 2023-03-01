const axios = require('axios');

axios.get('http://localhost:3000/pessoas')
    //bloco then catch
    .then(resp => {
        var pessoas = resp.data // lista de objetos pessoa
        console.log("Recuperei "+ pessoas.length + " registos!")
        console.log("Nome da quarta pessoa: " + pessoas[3].nome)
    })
    .catch(erro => {
        console.log("ERROR: " + erro)
    })