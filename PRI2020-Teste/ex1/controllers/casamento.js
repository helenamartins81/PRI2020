
var Casamento = require('../models/casamento')


module.exports.listar = () => {
    return Casamento
        .find({},{date:1,title:1,_id:1})
        .exec()
}

module.exports.filtraByAno = () => {
  
        return Casamento
            .aggregate([{$unwind: "$date"},{$sort: {date:1}}])
            .exec()
}





module.exports.consultar = id => {
    return Casamento
        .findOne({_id: id})
        .exec()
}




module.exports.filtraNome = (nome) => {
    return Casamento  
        .find({"title": {'$regex' : '.*' + nome + '.*'}})
        .exec()
}


module.exports.filtraAno = (ano) => {
    return Casamento   
        .find({"date": {'$regex' : '.*' + ano + '.*'}})
        .exec()
}



module.exports.listaNoivos = () => {
    return Casamento   
        .find()
        .exec()
}




