var http = require('http')
var axios = require('axios')
var fs = require('fs')



var {parse} = require('querystring');


function recuperaInfo(request, callback){
    if(request.headers['content-type']=='application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => { //request.on vai buscar blocos de k bytes e concatena
            body += bloco.toString()
        })
        request.on('end', () => {
            console.log(body)
            callback(parse(body))
        })
    }
}




function realizarTarefa(ident){
    var tarefa; 


    axios.get("http://localhost:3000/tarefas/"+ident)
        .then(response => {
                            
            tarefa = response.data
            console.log("asjkdhkjashdkajhs")
            res.end()

        })
        .catch(function(erro){
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>Não foi possível obter tarefa...")
            res.end()
        })

/*
    axios.put('http://localhost:3000/tarefas/' + ident, {"estado": "realizada"})
        .then(resp => {
            let a = resp.data
            console.log(resp.data);
        })
        .catch(error => {
        console.log(error);

        })

    
        
    axios.post('http://localhost:3000/realizadas/', a)
        .then(resp => {
            console.log(resp.data);
        })
        .catch(error => {
        console.log(error);

        })

    axios.delete('http://localhost:3000/tarefas/', a)
        .then(resp => {
            console.log(resp.data);
        })
        .catch(error => {
        console.log(error);

        }) */

       
}


// Template para o formulário de aluno ------------------
function formTarefas( d ){
    return `
    <html>
        <head>
            <title>Nova Tarefa</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
        
        </body>
            <div class="w3-container w3-teal">
                <h2>Nova Tarefa</h2>
            </div>

            <form class="w3-container" action="/tarefas" method="POST">

                <input class="w3-input w3-border w3-light-grey" type="hidden" name="id" value="" />

                <label class="w3-text-teal"><b>Título:</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="titulo">
          
                <label class="w3-text-teal"><b>Descrição:</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">

                <label class="w3-text-teal"><b>Responsável:</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="responsavel">

                <label class="w3-text-teal"><b>Data Inicial:</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="data">

                <input class="w3-input w3-border w3-light-grey" type="hidden" name="estado" value="pendente" />


                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 



            </form>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::PRI2020 em ${d}</address>
            </footer>
        </body>
    </html>
    `
}



//Gerar página das tarefas

function pagTarefas( tarefas, realizadas, canceladas, d){
    let pagHTML = `
      <html>
          <head>

          
              <title>To Do List</title>
              <meta charset="utf-8"/>
              <link rel="stylesheet" href="w3.css"/>
          </head>
          <body>
              <div class="w3-container w3-teal">
                  <h2>
                  To Do List
                  </h2>
              </div>
              <h3>Tarefas:</h3>
              <button class="w3-button w3-teal" style="margin: 20px 10px 50px 20px"><a href="/tarefas/registo">Nova Tarefa</a></button>
              
              <table class="w3-table w3-bordered" >
                <tr>
                    <th>Titulo</th>
                    <th>Descricao</th>
                    <th>Responsável</th>
                    <th>Data Limite</th>
                </tr>
  `    
  
    tarefas.forEach(a => {
        pagHTML +=`

        
            <tr>
                <td>${a.titulo}</a></td>
                <td>${a.descricao}</a></td>
                <td>${a.responsavel}</td>
                <td>${a.data}</td>
                <td>
                <button type="button" onclick="realizarTarefa(${a.id});" >Feito</button> 
                <button type="button">Cancelar</button> 
                </td>
            </tr>
        `
    })
    pagHTML += `
          </table>

          <h3>Realizadas:</h3>
              
              <table class="w3-table w3-bordered" >
                <tr>
                    <th>Titulo</th>
                    <th>Descricao</th>
                    <th>Responsável</th>
                    <th>Data Limite</th>
                </tr>
  `    
  
    realizadas.forEach(a => {
        pagHTML +=`
            <tr>
                <td>${a.titulo}</a></td>
                <td>${a.descricao}</a></td>
                <td>${a.responsavel}</td>
                <td>${a.data}</td>
            </tr>
        `
    })
    pagHTML += `
          </table>

          <h3>Canceladas:</h3>
              
              <table class="w3-table w3-bordered" >
                <tr>
                    <th>Titulo</th>
                    <th>Descricao</th>
                    <th>Responsável</th>
                    
                </tr>
  `    
  
    canceladas.forEach(a => {
        pagHTML +=`
            <tr>
                <td>${a.titulo}</a></td>
                <td>${a.descricao}</a></td>
                <td>${a.responsavel}</td>
                
            </tr>
        `
    })
    pagHTML += `
          </table>


          <div class="w3-container w3-teal">
              <address>Gerado por galuno::PRI2020 em ${d} --------------</address>
          </div>
      </body>
      </html>
    `
    return pagHTML
  }


/*
  function pagRealizadas( realizadas, d){
    pagHTML += `
    <h3>Realizadas:</h3>              
        <table class="w3-table w3-bordered" >
                <tr>
                    <th>Titulo</th>
                    <th>Descricao</th>
                    <th>Responsável</th>
                    <th>Data Limite</th>
                </tr>
  `    
  
    realizadas.forEach(a => {
        pagHTML +=`
            <tr>
                <td>${a.titulo}</a></td>
                <td>${a.descricao}</a></td>
                <td>${a.id}</td>
                <td>${a.data}</td>
            </tr>
        `
    })
    pagHTML += `
          </table>`  
    
    return pagHTML
  }

*/

// SERVIDOR

var listServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    switch(req.method){
        case "GET": 
            // GET /alunos --------------------------------------------------------------------
            if((req.url == "/") || (req.url == "/tarefas")){
                const requestOne = axios.get("http://localhost:3000/tarefas");
                const requestTwo = axios.get("http://localhost:3000/realizadas");
                const requestThree = axios.get("http://localhost:3000/canceladas");

                axios.all([requestOne, requestTwo, requestThree])
                    .then(responses => {
                        let tarefas = responses[0].data
                        let realizadas = responses[1].data
                        let canceladas = responses[2].data
                        
                        
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(pagTarefas(tarefas,realizadas, canceladas,d))
                        res.end()

                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>NÃ£o foi possÃ­vel obter as tarefas...")
                        res.end()
                    })
            }
            // GET /alunos/:id --------------------------------------------------------------------
           /*
            else if(/\/tarefas\/T[0-9]+$/.test(req.url)){
                var id = req.url.split("/")[2]
                axios.get("http://localhost:3000/tarefas/" + id)
                    .then( response => {
                        let a = response.data
                        
                        // Add code to render page with the student record
                    })
            }*/
            // GET /alunos/registo --------------------------------------------------------------------
            else if(req.url == "/tarefas/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(formTarefas(d))
                    res.end()
            }
            // GET /w3.css ------------------------------------------------------------------------
            else if(req.url == "/w3.css"){
                fs.readFile("w3.css", function(erro, dados){
                    if(!erro){
                        res.writeHead(200, {'Content-Type': 'text/css;charset=utf-8'})
                        res.write(dados)
                        res.end()
                    }
                })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " " + req.url + " nÃ£o suportado neste serviÃ§o.</p>")
                res.end()
            }
            break
        case "POST":

            if((req.url == "/") || (req.url == "/tarefas")){
                recuperaInfo(req, info =>{
                    axios.post('http://localhost:3000/tarefas', info)
                        .then (resp =>{
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p> Erro no POST:'+erro+'</p>')
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()
                        })

                })

            }
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write('<p>Recebi um POST de uma tarefa</p>')
            res.write('<p><a href="/">Voltar</a></p>')
            res.end()
            break;





        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " nÃ£o suportado neste serviÃ§o.</p>")
            res.end()
    }
})


listServer.listen(7777)
console.log('Servidor à escuta na porta 7777...')