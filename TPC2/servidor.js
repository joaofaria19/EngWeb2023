var http = require('http');
var url = require('url');

http.createServer(function(req,res){
    var pedido = url.parse(req.url,true).pathname

    var d = new Date().toISOString().substring(0,16);
    console.log(req.method+" "+req.url+" "+d);

    
}).listen(777);