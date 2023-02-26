var http = require('http');
var url = require('url');
var fs = require('fs');


http.createServer(function(req,res){
    var pedido = url.parse(req.url,true).pathname.substring(1)

    var d = new Date().toISOString().substring(0,16);
    console.log(req.method+" "+req.url+" "+d);
    if(!pedido){
        pedido='index'
    }
    
    fs.readFile(pedido+'.html', function (err,data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        if(err){
            res.write('Erro na leitura do ficheiro' + err)
        }
        res.write(data)
        res.end();

    })
}).listen(7778);

console.log("Servidor à escuta na porta 7778...")