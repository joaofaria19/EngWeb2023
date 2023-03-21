var axios = require('axios');

module.exports.list = ()=>{
    return axios.get("http://localhost:3000/tasks?_sort=date")
    .then(resposta => {
        return resposta.data
    })
    .catch(erro => {
        return erro
    })
}

module.exports.getTask = (idTask)=>{
    return axios.get("http://localhost:3000/tasks?id="+idTask)
    .then(resposta => {
        return resposta.data
    })
    .catch(erro => {
        return erro
    })
}


module.exports.addTask = task =>{
    return axios.post("http://localhost:3000/tasks", {
        "date": task.date,
        "who": task.who,
        "what": task.what,
        "done": false
    })
   .then(resposta => {
        return resposta.data
    })
    .catch(erro => {
        return erro
    })
}

module.exports.doneTask = idTask=>{
    return axios.get("http://localhost:3000/tasks/"+idTask)
    .then(resp => {
        axios.put("http://localhost:3000/tasks/" + idTask,{
            "id": resp.data.id,
            "date": resp.data.date,
            "who": resp.data.who,
            "what": resp.data.what,
            "done": true 
        })
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro        
        })
    })
    .catch(erro => {
        return erro
    })
}


module.exports.deleteTask = idTask=>{
    return axios.delete("http://localhost:3000/tasks/"+idTask)
    .then(resposta=>{
        return resposta.data
    }).catch(erro => {
        return erro
    })
}


module.exports.editTask = idTask=>{
    return axios.get("http://localhost:3000/tasks/"+idTask)
    .then(resposta=>{
        return resposta.data
    }).catch(erro => {
        return erro
    })
}

module.exports.updateToDoTask = (idTask,task)=>{
    return axios.put("http://localhost:3000/tasks/"+idTask,{
        "id": task.id,
        "date": task.date,
        "who": task.who,
        "what": task.what,
        "done": false 
    })
    .then(resposta=>{
        return resposta.data
    }).catch(erro => {
        return erro
    })
}


module.exports.updateDoneTask = (idTask,task)=>{
    return axios.put("http://localhost:3000/tasks/"+idTask,{
        "id": task.id,
        "date": task.date,
        "who": task.who,
        "what": task.what,
        "done": true 
    })
    .then(resposta=>{
        return resposta.data
    }).catch(erro => {
        return erro
    })
}