var Joi = require('joi');
var client_cas = require('./cassandra');
var fc = require('./functions');
var cassandra = require('cassandra-driver');
var amqp = require('amqplib/callback_api');

var userController = {};

var redis = require('redis');
//Promise.promisifyAll(require("redis"));
var Promise = require('bluebird');
Promise.promisifyAll(redis.RedisClient.prototype);

var client  = redis.createClient();
var multi = client.multi();

const redisClient = redis.createClient(
    {
      host: 'localhost',
      port: 6379,
    }
  );


client.on('connect', function(){
	console.log('Redis connection is up');
});

var uuid = require('uuid-random');
var passwordHash = require('password-hash');


//------------------------------------------------------------------------------------------------------

userController.getUsers = {
	handler: function (request, h) {
		cquery = "SELECT * FROM ks1.user;";
		//cquery = "Drop Table ks1.user;";
		//cquery = "CREATE TABLE IF NOT EXISTS ks1.user (userId TEXT, userFields TEXT, status TEXT, PRIMARY KEY (userId));";

		const promise = new Promise((resolve, reject) => {
			client_cas.execute(cquery, function (err, result) {
				if (err) {
					reject(err);
				} else {
					console.log(result);
					var user_arr = result.rows
					console.log(user_arr)
					var redis = require('redis'), client = redis.createClient();
					var user_multi = client.multi()
					
					for (var i=0; i< user_arr.length; i++) {
						console.log("single------"+JSON.stringify(user_arr[i]))
						user_multi.rpush('userlist', JSON.stringify(user_arr[i]));		
					}

					user_multi.exec(function(errors, results) {
						console.log("---res---aaa--------"+results)
					})			
					
					client.lrange('userlist', 0, -1, function (error, items) {
						if (error) throw error
						console.log("---ul--"+items)
						items.forEach(function (item) {
						 console.log(item);
						})
						//const response = h.response(JSON.parse(items));
						const response = h.response(result.rows);
						resolve(response);
					  })
					  
					//const response = h.response(result.rows);
					//resolve(response);
				}
			});
		});
		return promise;
	}
};

//------------------------------------------------------------------------------------------------------

userController.addUser = {
	handler: function (request, h) {
		// console.log(request);
		console.log(request.payload);
		//	console.log(JSON.stringify(request));
		var generatePassword = require('password-generator');
		var userId = uuid();
		

		/* salt generation crypto.randomBytes
		var hashedPassword = passwordHash.generate('password123');

		var hashedPwd = 'sha1$3I7HRwy7$cbfdac6008f9cab4083784cbd1874f76618d2a97';    
    	console.log(passwordHashed.isHashed('password123')); // false
		console.log(passwordHashed.isHashed(hashedPwd)); // true
		   
		var hashedPassword = 'sha1$3I7HRwy7$cbfdac6008f9cab4083784cbd1874f76618d2a97';
    	console.log(passwordHashed.verify('password123', hashedPassword)); // true
    	console.log(passwordHashed.verify('Password0', hashedPassword));
		*/


		cquery = "INSERT INTO ks1.user (name, email, phone_number, status)   VALUES (  ? ,  ? , ?, ?);"

		const promise = new Promise((resolve, reject) => {
			client_cas.execute(cquery, [request.payload.name, request.payload.email, request.payload.phone_number, request.payload.status], function (err, result) {
				if (err) {
					reject(err);
				} else {
					console.log(result);
					const response = h.response(result);
					resolve(response);
				}
			});
		});
		return promise;
	}
};


userController.addNewUser = {
	handler: function (request, h) {
		console.log(request.payload);
		//var generatePassword = require('password-generator');
		var userId = uuid();
		console.log("---1-------"+userId)
		console.log("---1-------"+JSON.stringify(request.payload).toString())
		cquery = "INSERT INTO ks1.user (userid, status, userfields)   VALUES (  ?, ?, ?);"
		console.log("---2-------")
		const promise = new Promise((resolve, reject) => {
			console.log("---3-------")
			client_cas.execute(cquery, [userId.toString().replace('-', ''), "Active", JSON.stringify(request.payload).toString()], function (err, result) {
				if (err) {
					console.log("err-----"+err)
					reject(err);
				} else {
					console.log("---4-------")
					console.log(result);
					const response = h.response(result);
					try {
						amqp.connect('amqp://localhost', function (error0, connection) {
							if (error0) {
								throw error0;
							}
							connection.createChannel(function (error1, channel) {
								if (error1) {
									throw error1;
								}
								var queue = 'task_queue';
								var msg = process.argv.slice(2).join(' ') || JSON.stringify(request.payload);
								channel.assertQueue(queue, {
									durable: true
								});
								channel.sendToQueue(queue, Buffer.from(msg), {
									persistent: true
								});
								console.log(" [x] Sent '%s'", msg);
								return msg
							});
						});
					} catch (e) {
						console.log("----error------------------")
					}
					resolve(response);
				}
			});
		});
		return promise;
	}
};


//------------------------------------------------------------------------------------------------------


module.exports = [
	{
		path: '/users',
		method: 'GET',
		config: userController.getUsers
	},
	{
		path: '/user_org',
		method: 'POST',
		config: userController.addUser
	},
	{
		path: '/user',
		method: 'POST',
		config: userController.addNewUser
	},
];
