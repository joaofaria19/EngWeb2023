var http = require('http');
var axios = require('axios');
var mypages = require('./mypages')
var fs = require('fs');

http.createServer(function (req,res){
    var d = new Date().toISOString().substring(0,16);
    console.log(req.method+" "+req.url+" "+d);

    if(req.url =='/'){
        axios.get('http://localhost:3000/pessoas?_sort=nome&_order=asc')
        //bloco then catch
        .then(resp => {
            var pessoas = resp.data // lista de objetos pessoa
            console.log("Recuperei "+ pessoas.length + " registos!")
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.getMainPage(pessoas,d))

        })
        .catch(erro => {
            console.log("ERROR: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: "+erro+".</p>")

        })
    }
    else if(req.url.match(/p\d+/)){
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
        //bloco then catch
        .then(resp => {
            var pessoas = resp.data // lista de objetos pessoa
            
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.pessoaPage(pessoas,d))

        })
        .catch(erro => {
            console.log("ERROR: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: "+erro+".</p>")

        })
    }
    else if(req.url=='/ordDesc'){
        axios.get('http://localhost:3000/pessoas')
        //bloco then catch
        .then(resp => {
            var pessoas = resp.data // lista de objetos pessoa
            let pessoasOrdenadas = pessoas.sort(
                (p1,p2) => (p1.nome <p2.nome) ? 1 : -1
            )
        
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.getMainPage(pessoasOrdenadas,d))

        })
        .catch(erro => {
            console.log("ERROR: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: "+erro+".</p>")

        })
    }
    else if(req.url.match(/(p\d+)*(\/w3.css)/)){
        fs.readFile('w3.css', function(err,data){
            res.writeHead(200,{'Content-Type': 'text/css; charset=utf-8'});
            if(err){
                res.write("ERRO na leiutra do ficheiro: "+err)
            }else{
                res.write(data)
            }
            res.end()
        })

    }else{
        res.writeHead(404,{'Content-Type': 'text/html; charset=utf-8'});
        res.end("<p>Erro: Operação não suportada....</p>")
    }

}).listen(7777);

console.log("Servidor à escuta na porta 7777....")