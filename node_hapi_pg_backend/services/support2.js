var Joi = require('joi');
var client_cas = require('./cassandra');
var fc = require('./functions');
var cassandra =  require('cassandra-driver');

var serviceController = {};


//------------------------------------------------------------------------------------------------------
/*
function async tgh(){
		 client_cas.execute(cquery, function (err, result) {

      if (typeof result === 'undefined'){
		  console.log("----1-----");
        return 'No service found.';
      } else
      {
		  console.log("----2-----");
          AlljsonServices='[';

          for (var i = 0; i < result.rows.length; i++) {

            user = result.rows[i];

            jsonService = '{ '
            + '"service_id" : "'+ user.email + '},';

            AlljsonServices=AlljsonServices+jsonService;
          }

          AlljsonServices=AlljsonServices.slice(0, - 1)+']';
			console.log("----2222-----"+AlljsonServices);
          return  await AlljsonServices;
      }
    }
    )
}

*/


serviceController.getServices = {
  handler: function(request, h) {

    cquery = "SELECT * FROM ks1.user;";

/*
    return client_cas.execute(cquery, function (err, result) {

      if (typeof result === 'undefined'){
		  console.log("----1-----");
        return h('No service found.').code(404);
      } else
      {
		  console.log("----2-----");
          AlljsonServices='[';

          for (var i = 0; i < result.rows.length; i++) {

            user = result.rows[i];

            jsonService = '{ '
            + '"service_id" : "'+ user.email + '},';

            AlljsonServices=AlljsonServices+jsonService;
          }

          AlljsonServices=AlljsonServices.slice(0, - 1)+']';
			console.log("----2222-----"+AlljsonServices);
          return h(AlljsonServices);
      }
    }
    )
	*/
	//return `Manju`;
	/*
	let temp
        client_cas.execute(cquery,function (err, result) {
            if (err) throw err;    
           console.log(result);
		   this.temp = result
           //return h.response(result); 
        }); 
	
	return h.response(temp); 
	*/
	
	const promise = new Promise((resolve, reject) => {
		client_cas.execute(cquery,function (err, result) {
            if (err){
				reject (err); 
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

//------------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------------


module.exports = [
    {
      path: '/users',
      method: 'GET',
      config: serviceController.getServices
    },
];
