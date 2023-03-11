const fs = require('fs');

function staticResource(request){
    return /\/w3.css$/.test(request.url) || 
            /\/favicon.png$/.test(request.url)
}

exports.staticResource = staticResource

function serveStaticResource(req, res){
    var partes = req.url.split('/')
    var file = partes[partes.length -1 ]
    fs.readFile('public/' + file, (erro, dados)=>{
        if(erro){
            console.log('Error: file not found ' + erro)
            res.statusCode = 404
            res.end('Error: file not found ' + erro)
        }
        else{
            if(file.match(/(\w+\.ico)$/)){
                res.setHeader('Content-Type', 'image/x-icon')
                res.end(dados)
            }
            else if(file.match(/\w+(.css)$/) ){
                res.setHeader('Content-Type', 'text/css')
                res.end(dados)
            }
            // PNG images
            else if(file.match(/(\w+\.png)$/) ){
                res.setHeader('Content-Type', 'image/png')
                res.end(dados)
            }    
        }
    })
}

exports.serveStaticResource = serveStaticResource