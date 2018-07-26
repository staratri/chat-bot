var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');

var assistant = new watson.AssistantV1({
  username: '60e09dd8-2003-4d9b-92da-cdb3f3a65781',
  password: 'o1bOQnkuYLJz',
  version: '2018-07-10'
});

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* GET home page. */
router.get('/', (req, res, next)=>{
  res.json({
    status :1, message : 'allgood'
  })
})
router.post('/sendMessage', function(req, res, next) {
  
  console.log(req.body.responseContext)
  assistant.message({
    workspace_id: '972e3ea0-6832-4c64-94a7-0bfe7080f9cc',
    input: {'text': req.body.message},
    context : req.body.responseContext
  },processResponse);
  function processResponse(err, response) {
    if (err)
      console.log('error:', err);
    else
     {
      return res.json({
        status :1, response : response
      })
    }
  }
});

module.exports = router;
