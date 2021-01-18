var express = require('express');
var router = express.Router();
var Casamento = require('../controllers/casamento')


/*
GET /api/casamentos - Devolve a lista dos casamentos, com os campos: date, title e ref;
GET /api/casamentos?nome=X - Devolve apenas uma lista com os casamentos onde o nome X aparece incluído no título;
GET /api/casamentos?ano=YYYY - Devolve a lista de casamentos realizados no ano YYYY;
GET /api/casamentos?byAno=true - Devolve a lista de casamentos agrupadas por ano, ou seja, devolve uma lista de anos em que a cada ano está associada uma lista de casamentos (coloque apenas a ref e o title do casamento);
GET /api/casamentos/noivos - Devolve uma lista de nomes dos noivos, ordenada alfabeticamente, e o id do respetivo registo..
*/

router.get('/casamentos', function(req, res) {

    if(req.query.nome){ 
        Casamento.filtraNome(req.query.nome)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }

    else if(req.query.ano){ 
        Casamento.filtraAno(req.query.ano)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }

    else if(req.query.byAno){ //testar
        Premio.filtraByAno()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }

    else{
        Casamento.listar()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }
    
});



router.get('/casamentos/:id', function(req, res) {
    Casamento.listaNoivos(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});



router.get('/casamentos/noivos', function(req, res) {
    Casamento.listaNoivos()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});


module.exports = router;
