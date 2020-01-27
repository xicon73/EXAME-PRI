var express = require('express');
var router = express.Router();
var axios = require('axios')

var apikey = "?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ"

/* 
- Na página inicial, para além de um título e outra informação de contexto, deverá aparecer a lista de diplomas (data, tipo, número e sumário);
- Ao clicar numa linha desta tabela o utilizador deve ser dirigido para a página do Diploma;
- Na página de cada diploma, deve ser mostrada a informação base do diploma (data, sumário, link, estado, entidades responsáveis pela sua publicação) e a lista de processos que regula;
- As entidades deverã ser links para a página oficial da entidade: http://clav.dglab.gov.pt/...;
- Os processos/classes deverão ser listados com os campos código e título e estes devem ser links para a página oficial do processo correspondente: http://clav.dglab.gov.pt/...
- Usa a tua imaginação e criatividade...
 */

router.get('/', function(req, res) {
  axios.get('http://clav-api.dglab.gov.pt/api/legislacao' + apikey)
    .then(dados => res.render('index', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});

router.get('/:id', function(req, res) {
  // axios.get('http://clav-api.dglab.gov.pt/api/legislacao/' + req.params.id + apikey)
  //   .then(dados => res.render('diploma', {dip: dados.data}))
  //   .catch(e => res.render('error', {error: e}))
  axios.all([
      axios.get('http://clav-api.dglab.gov.pt/api/legislacao/' + req.params.id + apikey),
      axios.get('http://clav-api.dglab.gov.pt/api/legislacao/' + req.params.id + '/processos' + apikey)
    ])
    .then(axios.spread((id, processos) => {
      res.render('diploma', {dip: id.data, pro : processos.data, ent : id.data.entidades})
    }));

});

module.exports = router;
