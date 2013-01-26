var trumpet = require('trumpet');

module.exports = function harmon(reqselectors, resselectors) {

	var reqselectors = reqselectors || [];
	var resselectors = resselectors || [];

	return function harmon(req, res, next)
	{
		var _write = res.write;
		var reqtr = trumpet();
		//var 	
		for(var i = 0; i < reqselectors.length; i++){
			reqtr.select(reqselectors[i].query, reqselectors[i].func);
		}
		
		req.on('data', function(data){
			reqtr.write(data);
		});
		
<<<<<<< HEAD
=======
		/*
		reqtr.on('data', function (buf) { 
			console.log(buf.toString());
			//req.write(buf);
			//_reqwrite.call(req, buf);
		});*/
			
		
>>>>>>> e77f302f4b98ab0c7ea3767e4aef9a0d788ac141
    	res.write = function (data) {
			var tr = trumpet();
			
			
			for(var i = 0; i < resselectors.length; i++){
				tr.select(resselectors[i].query, resselectors[i].func);
			}
			tr.on('data', function (buf) { 
				_write.call(res, buf);
			});
				
			tr.write(data);
    	}
		next();
	}
}