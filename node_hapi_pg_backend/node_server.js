const Hapi = require('hapi');
const server = Hapi.server({port: 3000, host: 'localhost',        
"routes": {
    "cors": true
}});
const cassandra = require('cassandra-driver');
const async = require('async');



const pgp = require('pg-promise')();
const connection = {
    host: 'localhost',
    port: 5432,
    database: 'mywebstore',
    user: 'postgres',
    password: 'password',
    max: 30 // use up to 30 connections
};
const db = pgp(connection);

var userRoutes = require('./users');
var productRoutes = require('./products');

/*
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'ks1'
});
*/


//server route
server.route(userRoutes);
server.route(productRoutes);

server.route({
	path : '/',
	method: 'GET',
	handler : async (request, h) => {
		
		
		
		try {

			
			
		
			/*
			var fff = require('./level.js')(50);
			console.log("ffff------"+fff)
			
			var aaaa = require('./new_task.js')({"aaa":"bbb", "ccc":"fffff"});
			console.log("aaaa------"+aaaa)
			*/
			
			// our set of columns, to be created only once (statically), and then reused,
			// to let it cache up its formatting templates for high performance:
			const cs = new pgp.helpers.ColumnSet(['code', 'name', 'price', 'status'], {table: 'product'});
			//new_task({"aaa":"bbb", "ccc":"ddd"});
			// data input values:
			const values = [{code: 'ddd', name: 'Samsung Galaxy M1', price: 1234, status: 'Active'}, {code: 'bbb', name: 'Samsung Z Flip', price: 1234, status: 'Active'}, {code: 'ccc', name: 'Samsung Galaxy Watch Active', price: 1234, status: 'Active'}];
			let single = {code: 'ccc', name: 'Samsung Galaxy Watch Active', price: 1234, status: 'Active'}
			// generating a multi-row insert query:
			const query = pgp.helpers.insert(single, null, 'product');
			//pgp.helpers.insert(values, cs);
			
			//=> INSERT INTO "tmp"("col_a","col_b") VALUES('a1','b1'),('a2','b2')

			/*
			// executing the query:
			db.none(query)
				.then(data => {
					// success, data = null
				})
				.catch(error => {
					// error;
				});
			
			*/
			
			
			
    const users = await db.any('SELECT * FROM product;');
	console.log(users);
    // success
} 
catch(e) {
    // error
	console.log(e)
}
		
		
		
		
		const response = h.response({ be: 'hapi' });
		return await response;
	}
});


//server start function
const start =  async () => {
	console.log("dddddddddddddddd");
	await server.start();
};

start();