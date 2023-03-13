var http = require('http')
var axios = require('axios')
var pages = require('./pages.js')
var static = require('./static.js')

const { parse } = require('querystring');

// Para recolher informação do body
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


var todoServer = http.createServer(function (req, res) {

    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratar de ficheiros static
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                if(req.url=="/" || req.url == "/tasks"){
                     axios.get("http://localhost:3000/tasks")
                         .then(response => {
                             var tasks = response.data
                             res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                             res.write(pages.homePage(tasks,d))
                             res.end()
                         })
                         .catch(erro => {
                             res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                             res.write("<p>Unable to get list of tasks... Erro: " + erro)
                             res.end()
                         })
                }
                else if(/\/tasks\/edit\/[0-9]+$/.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tasks/" + idTask)
                        .then( response => {
                            let task = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(pages.editTaskFormPage(task,d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<p>Could not get task ${idTask} Erro: ` + erro)
                            res.end()
                        })
                }
                else if(/\/tasks\/delete\/[0-9]+$/.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    axios.delete("http://localhost:3000/tasks/" + idTask)
                        .then( response => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(pages.confirmPage("The task has been removed"))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<p>Could not get task ${idTask} Erro: ` + erro)
                            res.end()
                        })
                }
                else if(/\/tasks\/done\/[0-9]+$/.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tasks/" + idTask)
                        .then( response => {
                            var task = response.data
                            axios.put('http://localhost:3000/tasks/'+task.id,{
                                "id": task.id,
                                "date": task.date,
                                "who": task.who,
                                "desc": task.desc,
                                "done": true
                            })
                                .then(resp => {
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(pages.confirmPage("The task "+task.desc+" done !!"))
                                    res.end()
                                }).catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to add task...</p>")
                                    res.end()
                                })
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<p>Could not get task '${idTask}' Erro: ` + erro)
                            res.end()
                        })
                }else if(/\/tasks\/edit\/delete\/[0-9]+$/.test(req.url)){
                        var idTask = req.url.split("/")[4]
                        axios.delete("http://localhost:3000/tasks/" + idTask)
                            .then(response => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(pages.confirmPage("The task has been removed"))
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(`<p>Could not get task ${idTask} Erro: ` + erro)
                                res.end()
                            })
                }else if(req.url == "/users/adduser"){
                    axios.get("http://localhost:3000/users/")
                        .then( response => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(pages.addUser(d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<p>Could not get list of users... Erro: ` + erro)
                            res.end()
                        })

                }
                break;
            case "POST":
                if(req.url=="/" || req.url=="/tasks"){
                    
                    axios.get('http://localhost:3000/tasks/')
                        .then( response =>{
                            var tasks = response.data
                            lastID = parseInt(tasks.lastIndexOf())
                            newID = lastID.id++
                    
                    collectRequestBodyData(req, result => {
                        console.log(result)
                        if(result){
                            axios.post('http://localhost:3000/tasks/',{
                                "id": newID,
                                "date": result.date,
                                "who": result.who,
                                "desc": result.desc,
                                "done": false
                            })
                            .then(resp => {
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(pages.confirmFormPage(result,d))
                                res.end()
                            }).catch(error => {
                                console.log('Erro: ' + error);
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Unable to insert task...</p>")
                                res.end()
                            })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    }) 
                    })
                    .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to get list of tasks... Erro: " + erro)
                        res.end()
                    })  

                } else if(req.url=="/users/adduser"){
                                        
                    axios.get('http://localhost:3000/users/')
                        .then( response =>{
                            var tasks = response.data
                            lastID = parseInt(tasks.lastIndexOf())
                            newID = lastID.id++
                    
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/users/',{
                                "id": newID,
                                "name": result.name,
                            })
                            .then(resp => {
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(pages.confirmUserFormPage(result,d))
                                res.end()
                            }).catch(error => {
                                console.log('Erro: ' + error);
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Unable to insert task...</p>")
                                res.end()
                            })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    }) 
                    })
                    .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to get list of tasks... Erro: " + erro)
                        res.end()
                    })  
                } else if(/\/tasks\/edit\/[0-9]+$/.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/tasks/' + idTask, {
                                "id": idTask,
                                "date": result.date,
                                "who": result.who,
                                "desc": result.desc,
                                "done": false
                            })
                                .then(resp => {
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(pages.confirmPage("Registo alterado:" + JSON.stringify(resp.data)))
                                    res.end()
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end("<p>Unable to insert record...</p>")
                                });
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                break;    
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
})

todoServer.listen(7777, ()=>{
    console.log("Server listening on port 7777...")
})