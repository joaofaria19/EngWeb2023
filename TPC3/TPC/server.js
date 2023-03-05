var http = require('http');
var axios = require('axios');
var mypages = require('./pages')
var fs = require('fs');

http.createServer(function (req,res){
    var d = new Date().toISOString().substring(0,16);
    console.log(req.method+" "+req.url+" "+d);

    if(req.url =='/'){
        axios.get('http://localhost:3000')
        //bloco then catch
        .then(resp => {
            var pessoas = resp.data // lista de objetos pessoa
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
        //bloco then catch
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
        axios.get('http://localhost:3000/pessoas?_sort=nome&_ordered=asc')
        //bloco then catch
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
    else if(req.url == '/sexs'){
        axios.get('http://localhost:3000/pessoas/')
        //bloco then catch
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
        //bloco then catch
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
    
    // Expressão regular para enviar sempre o ficheiro css quando requisitado, independente do url posterior
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
        //bloco then catch
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
    // TO DO: Falta consertar o pedido dos desportos
    else if(req.url.match(/(sports)\/\w+/)){
        axios.get('http://localhost:3000/pessoas')
        //bloco then catch
        .then(resp => {
            var pessoas = resp.data // lista de objetos pessoa
            //var desporto = []
            //for(let i=0; i<pessoas.length;i++){
            //    for(let j=0; j<pessoas[i].desportos; j++){
            //        if()
            //    }
            //
            //}

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.getPessoasPage(pessoas,d))

        })
        .catch(erro => {
            console.log("ERROR: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: "+erro+".</p>")

        })
    
    }
    // TO DO: Falta consertar o pedido das profissoes
    else if(req.url.match(/(top10jobs)\/\w+/)){
        axios.get('http://localhost:3000/pessoas?profissao='+decodeURIComponent(req.url.substring(11)))
        //bloco then catch
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
    else if(req.url.match(/p\d+/)){
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(1))
        //bloco then catch
        .then(resp => {
            var pessoa = resp.data // lista de objetos pessoa
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