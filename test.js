var jsonDB = require('./index.js');

jsonDB.createDatabase('test', function(response) {
	console.log(JSON.stringify(response));
});
