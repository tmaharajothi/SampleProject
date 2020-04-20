const Hapi = require('hapi');
/*
const server = Hapi.server({port: 3000, host: 'localhost', routes: {{
    cors: {
      origin: ['*']
    }}});
	//,routes: {cors: true}
	
	*/
	const server = Hapi.server({
port: 3000,
host: 'localhost',        
"routes": {
    "cors": true
}
});

/*
	
const server = new Hapi.Server({
"host": "localhost",
"port": 3000,
"routes": {
"cors": {
origin: ["http://localhost:3001"],
headers: ["Accept", "Content-Type"],
additionalHeaders: ["X-Requested-With"]
}
}
});	
*/

const redis = require("redis");
const client = redis.createClient();
 
client.on("error", function(error) {
  console.error(error);
});
 
	
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

const checkOrigin = (origin) => {
    if(origin === 'http://localhost:3001'){
        return true
    }else{
        return false
    }
}

var userRoutes = require('./users');
var productRoutes = require('./products');

server.route(userRoutes);
server.route(productRoutes);

server.route({
	path : '/',
	method: 'GET',
	handler : async (request, h) => {
		
		client.set("name", "Maharajothi", redis.print);
        client.get("name", redis.print);
		
		try {	
			console.log('-----------------------aaa--------');
			const obj = {name: "1212121", code: "fgfg", price: "12345", status: "1"}
			db.query("INSERT INTO product VALUES(${name}, ${code}, ${price}, ${status})", obj);
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
	//await server.start();
	try {
        await server.register({
            plugin: require('hapi-cors'),
            options: {
                checkOrigin: checkOrigin
            }
        })
 
        await server.start();
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
	
};

start();