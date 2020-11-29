var express = require('express');
var router = express.Router();


const Aluno = require('../controllers/aluno');
const { route } = require('./users');



/* GET home page. */  
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Turma PRI de 2020' });
});




/* GET /alunos - lista de alunos*/
router.get('/alunos', (req, res) => {
    Aluno.listar()
      .then(dados => res.render('alunos', {lista: dados}))
      .catch(e => res.render('error', {error: e}))
});



/* GET /alunos/registar - registar aluno*/
router.get('/alunos/registar', function(req,res){
  
  res.render('registo',{title: 'Registar Aluno'});
  
})

/* GET /alunos/:id  - página de um determinado aluno*/
router.get('/alunos/:id', function(req,res){
  
  Aluno.consultar(req.params.id)
  .then(dados => res.render('aluno', {aluno: dados}))
    .catch(erro => res.status(500).jsonp(erro))
});



/* GET /alunos/editar - página de editar aluno */
router.get('/alunos/editar/:id', function(req,res){
   Aluno.consultar(req.params.id)
        .then(dados => res.render('editar', { 
          user: dados
      }))
        .catch(e => res.render('error', {
            error: e
        }))

}) 


/* PUT /alunos/:id - editar registo de aluno na bd */
router.post("/alunos/:id", function(req, res) {
    Aluno.editar(req.params.id, req.body)
        .then(dados => {
            res.render('index')
        })
        .catch(e => res.render('error', {
            error: e
        }))
        res.redirect('/alunos')
})




/* POST /alunos - adicionar um registo à bd
res.jsonp -> Sends a JSON response with JSONP support. 
This method is identical to res.json(), except that it opts-in to JSONP callback support.*/

router.post('/alunos', (req,res)=>{
  Aluno.inserir(req)
  res.redirect('/alunos')
})




/* DELETE /alunos/:id - elimina um aluno da bd */
router.post('/eliminar/:id', function(req,res){
  
  Aluno.apagar(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))

        res.redirect('/alunos')
      });



module.exports = router;
