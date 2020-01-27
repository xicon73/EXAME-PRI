var Obras = require('../models/obras')
var mongoose = require('mongoose')

module.exports.listar = () => {
    return Obras
        .find()
        .exec()
}

module.exports.consultarObra = ident => {
    return Obras
        .findOne({id: ident})
        .exec()
}

module.exports.compositores = () => {
    return Obra
        .distinct("compositores")
        .exec()
}

module.exports.obrasQuant = () => {
    return Obra
        .aggregate([{$project: {id:1, titulo:1, _id:0, numberOfPartituras:{$cond: {if: { $isArray:"$instrumentos"}, then: {$size: "$instrumentos"}, else: "0"}}}}])
        .exec()
}

// module.exports.ObrasCompositor = (name) => {
//     return Obra
//         .aggregate([{$unwind:"$authors.element"},
//             {$project:{name: "$authors.element",Obra:{booktile:"$booktitle",title:"$title", year: "$year"}}}, 
//             {$group:{_id:"$name",Obras:{$push:"$Obra"}}},
//             {$sort:{_id:1}},
//             {$match: {_id : name}}
//         ])
//         .exec();
// }

// module.exports.ObrasInstrumento = (name) => {
//     return Obra
//         .aggregate([{$unwind:"$authors.element"},
//             {$project:{name: "$authors.element",Obra:{booktile:"$booktitle",title:"$title", year: "$year"}}}, 
//             {$group:{_id:"$name",Obras:{$push:"$Obra"}}},
//             {$sort:{_id:1}},
//             {$match: {_id : name}}
//         ])
//         .exec();
// }
