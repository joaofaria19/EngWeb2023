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


var alunosServer = http.createServer(function (req, res) {

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
                    axios.get("http://localhost:3000/tasks?id=" + idTask)
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
                 else if(/\/tasks\/edit\/delete\/[0-9]+$/.test(req.url)){
                    var idTask = req.url.split("/")[4]
                    axios.delete("http://localhost:3000/tasks?id=" + idTask)
                        .then( response => {
                            // Add code to render page with the student record
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            // ...
                            res.end(`<p>The task ${idTask} has been removed</p>`)
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<p>Could not get task ${idTask} Erro: ` + erro)
                            res.end()
                        })
                }
            case "POST":
                if(req.url == '/registo'){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(pages.confirmFormPage(d))
                    res.end()
                }
                break;
            }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Server listening on port 7777...")
})