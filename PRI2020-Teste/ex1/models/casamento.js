const mongoose = require('mongoose')

var casamentoSchema = new mongoose.Schema({
  date: String,
  title: String,
  _id: String,
  href: String
});




module.exports = mongoose.model('casamento', casamentoSchema, 'casamentos')