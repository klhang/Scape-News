var jayson = require('jayson');

var client = jayson.client.http({
  port: 4040,
  hostname: 'localhost'
})

function add(a,b, callback){
  client.request('add', [a,b], function(err, error, response){
    //	err	is	the	error	from	jayson	which	we	cannot	handle	so	throw	err
 		//	error	is	from	RPC	server
		//	for	example,	a	or	b	is	invalid	number	to	add
    if (err) {
      throw err;
    }

    console.log(response);
    callback(response);
  })
}


function getNewsSummariesForUser(user_id, page_num, callback) {
  client.request('getNewsSummariesForUser', [user_id, page_num], function(err, res) {
    if (err) {
      throw err;
    }
    console.log(res);
    callback(res.result);
  })
}

module.exports = {
  add: add,
  getNewsSummariesForUser: getNewsSummariesForUser
}
