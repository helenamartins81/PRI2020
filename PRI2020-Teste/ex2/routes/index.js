var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTExMjIyMyIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJwcmkyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMDk4NDEyOSwiZXhwIjoxNjExMDEyOTI5fQ.L3ZbIRFR2SVOP8hAVCwm2I-HuWhxTcq-2jLR6f6yUwj29Hm1K-0tsFZCamntGk-lbDQaYDPEzeLpFso89lB7QP5TS_ucqm479UHlqXrCiVwA22qVddiox_0d_asldQLC8vmgaKP37A6FxHFOz7mK4UasSb04wTG7YoN9fPS_K14T7GdSs3FmahGHd2DWUmqYNflQ4px9aZ8lBS_L1cjLdPQIvJWLKVxWlhpcgfCEfTeL0tdAZZFigB28e0pRD3Urm5GQO4Y70SFYkhezjwj_QMaLEPwbolx5tmZvlMWMF1Ck2_6G-Y5QxWE97s9RzSvoiFvjZWbFb_XgkGTId7e8Sw')
    .then(dados => {
      res.render('index', { lista: dados.data })
    })
    .catch(erro => {
      res.render('error',{error: erro})
    })
  
});


router.get('/classe/:id', function(req, res, next) {

  axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+ req.params.id +'?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTExMjIyMyIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJwcmkyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMDk4NDEyOSwiZXhwIjoxNjExMDEyOTI5fQ.L3ZbIRFR2SVOP8hAVCwm2I-HuWhxTcq-2jLR6f6yUwj29Hm1K-0tsFZCamntGk-lbDQaYDPEzeLpFso89lB7QP5TS_ucqm479UHlqXrCiVwA22qVddiox_0d_asldQLC8vmgaKP37A6FxHFOz7mK4UasSb04wTG7YoN9fPS_K14T7GdSs3FmahGHd2DWUmqYNflQ4px9aZ8lBS_L1cjLdPQIvJWLKVxWlhpcgfCEfTeL0tdAZZFigB28e0pRD3Urm5GQO4Y70SFYkhezjwj_QMaLEPwbolx5tmZvlMWMF1Ck2_6G-Y5QxWE97s9RzSvoiFvjZWbFb_XgkGTId7e8Sw')
    .then(dados => {
      axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+ req.params.id +'/descendencia?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTExMjIyMyIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJwcmkyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMDk4NDEyOSwiZXhwIjoxNjExMDEyOTI5fQ.L3ZbIRFR2SVOP8hAVCwm2I-HuWhxTcq-2jLR6f6yUwj29Hm1K-0tsFZCamntGk-lbDQaYDPEzeLpFso89lB7QP5TS_ucqm479UHlqXrCiVwA22qVddiox_0d_asldQLC8vmgaKP37A6FxHFOz7mK4UasSb04wTG7YoN9fPS_K14T7GdSs3FmahGHd2DWUmqYNflQ4px9aZ8lBS_L1cjLdPQIvJWLKVxWlhpcgfCEfTeL0tdAZZFigB28e0pRD3Urm5GQO4Y70SFYkhezjwj_QMaLEPwbolx5tmZvlMWMF1Ck2_6G-Y5QxWE97s9RzSvoiFvjZWbFb_XgkGTId7e8Sw')
        .then(descendencia => {
          res.render('info-classe', { lista: dados.data, desc: descendencia.data })
        })
        .catch(erro => {
          res.render('error',{error: erro})
        })
    })
    .catch(erro => {
      res.render('error',{error: erro})
    })
  
});


module.exports = router;
