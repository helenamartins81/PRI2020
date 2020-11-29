var Aluno = require('../models/aluno')
var mongoose = require('mongoose')

// Devolve a lista de alunos
module.exports.listar = () => {
    return Aluno
        .find()
        .exec()
}

module.exports.consultar = id => {
    return Aluno
        .findOne({_id: id})
        .exec()
}

module.exports.inserir = a => {
    var values = [0,0,0,0,0,0,0,0];
    if (a.body.tpc1 == 'on')
        values[0] = 1
    if (a.body.tpc2 == 'on')
        values[1] = 1
    if (a.body.tpc3 == 'on')
        values[2] = 1
    if (a.body.tpc4 == 'on')
        values[3] = 1
    if (a.body.tpc5 == 'on')
        values[4] = 1
    if (a.body.tpc6 == 'on')
        values[5] = 1
    if (a.body.tpc7 == 'on')
        values[6] = 1
    if (a.body.tpc8 == 'on')
        values[7] = 1
    var novo = new Aluno(a.body)
    novo.tpc = values
    return novo.save()
}




module.exports.editar = (num, aluno) => {
    return Aluno
        .updateOne({
            _id: num
        }, aluno)
}



module.exports.apagar = ident => {
    return Aluno
            .deleteOne({_id: ident})
            .exec()
}

