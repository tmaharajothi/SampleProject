const Hapi = require('hapi');

const server = Hapi.server({
	port:3000,
	host:	'localhost'
});

const start = async () => {
	console.log("hi jo");
	await server.start();
};


server.route({
	path : '/user',
	method: 'GET',
	handler : function(request, h) {
		const user = {"aaa":"bbb", "ccc": "ddd"}
		return user;
	}
});

server.route({
	path : '/',
	method: 'GET',
	handler: (request, h) => {
		return 'Hello Maharajothi';
	}
});

server.route({
	path: '/{id}',
	method: 'GET',
	handler: (request, h) => {
		return `Product ID   : ${encodeURIComponent(request.params.id)}`;
	}
});




start();