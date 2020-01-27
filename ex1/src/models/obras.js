const mongoose = require('mongoose')

var instrumentosSchema = new mongoose.Schema({
    element: [String]
});

var obrasSchema = new mongoose.Schema({
    id : String,
    titulo : String,
    tipo: String,
    compositor: String,
    instrumentos : instrumentosSchema,
  });

module.exports = mongoose.model('obras', obrasSchema)
