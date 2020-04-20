
var fc = require('./functions');

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
var productController = {};


//------------------------------------------------------------------------------------------------------

productController.getProducts = {
  handler: async function(request, h) {
	try{
			const products = await db.any('SELECT * FROM product;');
		console.log(products);
		const response = h.response(products);
		return response;
	} 
	catch(e) {
		console.log(e)
		return h.response({err: e});
	}	
  }
};

//------------------------------------------------------------------------------------------------------

productController.addProduct = {
  handler: async function(request, h) {
	   console.log(request);
	 console.log(request.payload);
	try{		
		const cs = new pgp.helpers.ColumnSet(['code', 'name', 'price', 'status'], {table: 'product'});
		
		// data input values:
		const values = [{code: request.payload.code, name: request.payload.name, price: request.payload.price, status: request.payload.status}];

		// generating a multi-row insert query:
		const query = pgp.helpers.insert(values, cs);
		
		// executing the query:
		db.none(query)
			.then(data => {
				// success, data = null
				const response = h.response({status: 200});
				return response;
			})
			.catch(error => {
				// error;
				const response = h.response({error: error});
				return response;
			});
				
	} 
	catch(e) {
		console.log(e)
		return h.response({err: e});
	}	
  }
};


//------------------------------------------------------------------------------------------------------


module.exports = [
    {
      path: '/products',
      method: 'GET',
      config: productController.getProducts
    },
	{
      path: '/product',
      method: 'POST',
      config: productController.addProduct
    },
];
