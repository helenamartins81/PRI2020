var http = require('http')
var fs = require('fs')

var servidor = http.createServer(function (req,res){
    

    if(req.url.match(/\/arq\/[0-9]+$/)){

    var num = req.url.split("/")[2]

        fs.readFile('./arqsite/arq'+num+'.html', function(err,data){
            if(err){
                console.log('Erro: '+err)
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write("<p>Ficheiro inexistente</p>")
                res.end()
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data)
                res.end()
            }
        })
    }
    else if (req.url.match(/\/arq\/arq[0-9]+/)){
        var num = req.url.split("/")[2]
        console.log(num)
        fs.readFile('./arqsite/'+num, function(err,data){
            if(err){
                console.log('Erro: '+err)
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write("<p>Ficheiro inexistente</p>")
                res.end()
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data)
                res.end()
            }
        })

    }
    else if(req.url.match(/\/arq\/index/) || req.url.match(/\/arq\//) ){
        fs.readFile('./arqsite/index.html', function(err,data){
            if(err){
                console.log('Erro: '+err)
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write("<p>Ficheiro inexistente</p>")
                res.end()
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data)
                res.end()
            }
        })
    }
    else{
        console.log('Erro: foi pedido um ficheiro não esperado')
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write("<p>Ficheiro inexistente</p>")
        res.end()
    }
    
})

servidor.listen(7777)
console.log("Servidor à escuta.....")

