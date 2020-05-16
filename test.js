var jsonDB = require('./index.js');

jsonDB.createDatabase(function(response) {
	console.log(JSON.stringify(response));
});
