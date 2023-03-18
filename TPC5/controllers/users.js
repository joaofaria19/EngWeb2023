var axios = require('axios');

module.exports.list = ()=>{
    return axios.get("http://localhost:3000/users?_sort=name")
    .then(resposta => {
        return resposta.data
    })
    .catch(erro => {
        return erro
    })
}


module.exports.addUser = user =>{
    return axios.post("http://localhost:3000/users",{
        "name": user.name
    })
   .then(resposta => {
        return resposta.data
    })
    .catch(erro => {
        return erro
    })
}