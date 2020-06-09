var jsonDB = require('./index.js');

/*jsonDB.createDatabase({'name': 'test'}, function(response) {
	console.log(JSON.stringify(response));
});*/

/*jsonDB.dropDatabase('test', function(response) {
	console.log(JSON.stringify(response));
});*/


/*jsonDB.createTable({'database': 'test', 'tableName': 'users'}, function(response) {
	console.log(JSON.stringify(response));
});*/

/*jsonDB.createTable({'database': 'test', 'tableName': 'tokens'}, function(response) {
	console.log(JSON.stringify(response));
});*/

/*jsonDB.dropTable({'database': 'test', 'tableName': 'tokens'}, function(response) {
	console.log(JSON.stringify(response));
});*/

/*jsonDB.insertRecord({'database': 'test', 'tableName': 'users', record: {'email': 'abc'}}, function(response) {
	console.log(JSON.stringify(response));
});*/

/*jsonDB.getRecordById({'database': 'test', 'tableName': 'users', recordId: '1'}, function(response) {
	console.log(JSON.stringify(response));
});*/

/*jsonDB.getRecordByKeyValue({'database': 'test', 'tableName': 'users', key: 'email', value: 'abc'}, function(response) {
	console.log(JSON.stringify(response));
});*/

/*jsonDB.getRecordByObject({'database': 'test', 'tableName': 'users', obj: {'email': 'abc', 'password': 'passpass'}}, function(response) {
	console.log(JSON.stringify(response));
});*/

jsonDB.getAllRecords({'database': 'test', 'tableName': 'users', obj: {'email': 'abc', 'password': 'passpass'}}, function(response) {
	console.log(JSON.stringify(response));
});