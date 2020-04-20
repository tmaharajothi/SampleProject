const Hapi = require('hapi');

const server = Hapi.server({port: 3000, host: 'localhost'});
const cassandra = require('cassandra-driver');
const async = require('async');

//var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'demo'});
//const client = new cassandra.Client({ contactPoints: ['localhost'], keyspace: 'ks1' });


//const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'ks1'
});


// set cookie
server.state('username', {
	ttl: null,
	isSecure: true,
	isHttpOnly : true
});

//server route
server.route({
	path : '/',
	method: 'GET',
	handler : async (request, h) => {
		//console.log(request.state.username);
		//await h.state('username', 'hhhhhh');
		//console.log(request.state.username);
		//return h.response(request.state.username);		
		
		
		
/*		
client.execute("SELECT * FROM ks1.user;');", (err, res) => {
	console.log("Hi Maha");
	console.log(err, res);
});
*/


//Ensure all queries are executed before exit
function execute(query, params, callback) {
  return new Promise((resolve, reject) => {
    client.execute(query, params, (err, result) => {
      if(err) {
        reject()
      } else {
        callback(err, result);
        resolve()
      }
    });
  });
}
 
//Execute the queries 
var query = 'SELECT * FROM ks1.user WHERE status=? ALLOW FILTERING';
var q1 = execute(query, ['Active'], (err, result) => { 

	//console.log('The cost per orange is $' + result.rows[0].status)
	console.log(result);
});
Promise.all([q1]).then(() => {
  console.log('exit');
  process.exit();
});
		
		
		return `Mahara`;
	}
});


server.route({
	path : '/user',
	method: 'GET',
	handler : async (request, h) => {
	/*	
	return new Promise((resolve, reject) => {
		return resolve(result);
	})
	*/
	
	
	
	//Execute query
	function execute(query, params, callback) {
	  return new Promise((resolve, reject) => {
		client.execute(query, params, (err, result) => {
		  if(err) {
			return reject()
		  } else {
			callback(err, result);			
		  }
		});
	  });
	}
 
	//Execute the queries 
	var query = 'SELECT * FROM ks1.user WHERE status=? ALLOW FILTERING';
	var q1 = execute(query, ['Active'], (err, result) => { 
		console.log(result);
		//return result;
		//return `Mahara`;
		return result
	});		
	console.log("jjjjjjj");
	console.log(q1);
	return h.response(q1);
		
	}
});




//server start function
const start =  async () => {
	console.log("dddddddddddddddd");
	await server.start();
};

start();