var http = require('http');
var axios = require('axios');
var mypages = require('./pages')
var fs = require('fs');

/*
Servidor que irá servir os vários pedidos que chegam no url
*/
http.createServer(function (req,res){
    var d = new Date().toISOString().substring(0,16);
    console.log(req.method+" "+req.url+" "+d);

    if(req.url =='/'){
        axios.get('http://localhost:3000')
        .then(resp => {
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.getMainPage(d))

        })
        .catch(erro => {
            console.log("ERROR: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: "+erro+".</p>")

        })
    }
    else if(req.url == '/people'){
        axios.get('http://localhost:3000/pessoas/')
        .then(resp => {
            var pessoas = resp.data // lista de objetos pessoa
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.getPessoasPage(pessoas,d))

        })
        .catch(erro => {
            console.log("ERROR: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: "+erro+".</p>")

        })
    }
    else if(req.url == '/people/asc'){
        axios.get('http://localhost:3000/pessoas?_sort=nome&_order=asc')
        .then(resp => {
            var pessoas = resp.data // lista de objetos pessoa(ordem crescente)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.getPessoasPage(pessoas,d))

        })
        .catch(erro => {
            console.log("ERROR: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: "+erro+".</p>")

        })
    }
    else if(req.url == '/people/desc'){
        axios.get('http://localhost:3000/pessoas?_sort=nome&_order=desc')
        .then(resp => {
            var pessoas = resp.data // lista de objetos pessoa(ordem decrescente)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.getPessoasPage(pessoas,d))

        })
        .catch(erro => {
            console.log("ERROR: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: "+erro+".</p>")

        })
    }
    else if(req.url == '/sexs'){
        axios.get('http://localhost:3000/pessoas/')
        .then(resp => {
            var pessoas = resp.data // lista de objetos pessoa
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.getDistSexPage(pessoas,d))

        })
        .catch(erro => {
            console.log("ERROR: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: "+erro+".</p>")

        })
    }
    else if(req.url == '/sports'){
        axios.get('http://localhost:3000/pessoas/')
        .then(resp => {
            var pessoas = resp.data // lista de objetos pessoa
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.getDistSportsPage(pessoas,d))

        })
        .catch(erro => {
            console.log("ERROR: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: "+erro+".</p>")

        })
    }
    else if(req.url == '/top10jobs'){
        axios.get('http://localhost:3000/pessoas/')
        //bloco then catch
        .then(resp => {
            var pessoas = resp.data // lista de objetos pessoa
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.getTop10Page(pessoas,d))

        })
        .catch(erro => {
            console.log("ERROR: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: "+erro+".</p>")

        })
    }
    else if(req.url.match(/(\/\w+)*(\/w3\.css)/)){
            fs.readFile('w3.css', function(err,data){
                res.writeHead(200,{'Content-Type': 'text/css; charset=utf-8'});
                if(err){
                    res.write("ERRO na leiutra do ficheiro: "+err)
                }else{
                    res.write(data)
                }
                res.end()
            })
    }
    else if(req.url.match(/(sexs)\/\w+/)){
        axios.get('http://localhost:3000/pessoas?sexo='+req.url.substring(6))
        .then(resp => {
            var pessoas = resp.data // lista de objetos pessoa de um determinado sexo
        
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.getPessoasPage(pessoas,d))

        })
        .catch(erro => {
            console.log("ERROR: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: "+erro+".</p>")

        })
    
    }
    else if(req.url.match(/(sports)\/\w+/)){
        axios.get('http://localhost:3000/pessoas')
        .then(resp => {
            var lista_pessoas = []
            var pessoas = resp.data // lista de objetos pessoa
            var desporto = decodeURIComponent(req.url.substring(8))
            for(let i=0; i<pessoas.length;i++){
                for(let j=0; j<pessoas[i].desportos.length; j++){
                    if(decodeURIComponent(pessoas[i].desportos[j]) == desporto)
                        lista_pessoas.push(pessoas[i])
                }
            
            }
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.getPessoasPage(lista_pessoas,d))

        })
        .catch(erro => {
            console.log("ERROR: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: "+erro+".</p>")

        })
    
    }
    else if(req.url.match(/(top10jobs)\/\w+/)){
        axios.get('http://localhost:3000/pessoas?profissao='+decodeURIComponent(req.url.substring(11)))
        .then(resp => {
            var pessoas = resp.data // lista de objetos pessoa de uma determinada profissão
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.getPessoasPage(pessoas,d))

        })
        .catch(erro => {
            console.log("ERROR: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: "+erro+".</p>")

        })
    
    }
    else if(req.url.match(/p\d+/)){
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(1))
        .then(resp => {
            var pessoa = resp.data // objeto pessoa
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.pessoaPage(pessoa,d))

        })
        .catch(erro => {
            console.log("ERROR: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: "+erro+".</p>")

        })
    }
    else{
        res.writeHead(404,{'Content-Type': 'text/html; charset=utf-8'});
        res.end("<p>Erro: Operação não suportada....</p>")
    }

}).listen(7777);

console.log("Servidor à escuta na porta 7777....")