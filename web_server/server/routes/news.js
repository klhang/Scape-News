var express = require('express');
var router = express.Router();

var rpc_client = require('../rpc_client/rpc_client');


router.get('/userID/:userID/pageNum/:pageNum', function(req, res, next){
  console.log('Fetching news...');
  // user ":" to get variable in url
  user_id = req.params['userID'];
  page_num = req.params['pageNum'];

  rpc_client.getNewsSummariesForUser(user_id, page_num, function(response){
    res.json(response);
  });

})

module.exports = router;
