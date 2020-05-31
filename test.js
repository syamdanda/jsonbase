var jsonDB = require('./index.js');

jsonDB.createDatabase({'name': 'test'}, function(response) {
	console.log(JSON.stringify(response));
});

/*jsonDB.dropDatabase('test', function(response) {
	console.log(JSON.stringify(response));
});
*/