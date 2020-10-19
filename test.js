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

/*jsonDB.createTable({'database': 'test', 'tableName': 'users21'}, function(response) {
	console.log(JSON.stringify(response));
});*/

/*jsonDB.createTable({'database': 'test', 'tableName': 'tokens'}, function(response) {
	console.log(JSON.stringify(response));
});*/

/*jsonDB.dropTable({'database': 'test', 'tableName': 'users3'}, function(response) {
	console.log(JSON.stringify(response));
});*/

/*jsonDB.dropTable({'database': 'test', 'tableName': 'users21'}, function(response) {
	console.log(JSON.stringify(response));
});*/

/*jsonDB.insertRecord({'database': 'test', 'tableName': 'users', record: {'email': 'abc121'}}, function(response) {
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

/*jsonDB.getAllRecords({'database': 'test', 'tableName': 'users'}, function(response) {
	console.log(JSON.stringify(response));
});*/

/*jsonDB.deleteRecordById({'database': 'test', 'tableName': 'users', 'recordId': '1'}, function(response) {
	console.log(JSON.stringify(response));
});*/


/*jsonDB.deleteRecordByKeyValue({'database': 'test', 'tableName': 'users', key: 'email', value: 'ab2c'}, function(response) {
	console.log(JSON.stringify(response));
});*/

/*jsonDB.updateRecordById({'database': 'test', 'tableName': 'users', recordId: '10', recordObj: {'email': 'new123', 'pwd': 'password'}}, function(response) {
	console.log(JSON.stringify(response));
});*/

/*for (i=0; i<100; i++) {
	jsonDB.getRecordById({'database': 'test', 'tableName': 'users', recordId: '116'}, function(response) {
		console.log(JSON.stringify(response));
	});
}*/

/*jsonDB.asyncTest({'database': 'test', 'tableName': 'users', recordObj: {'email': 'new123', 'pwd': 'password'}}, function(response) {
		console.log('111111111111111111111111111111');
		console.log(JSON.stringify(response));
	});

jsonDB.asyncTest({'database': 'test', 'tableName': 'users', recordObj: {'email': 'new123', 'pwd': 'password'}}, function(response) {
		console.log('2222222222222222222222222222');
		console.log(JSON.stringify(response));
	});*/

/*jsonDB.updateRecordByKeyValue({'database': 'test', 'tableName': 'users', key: 'email', value: 'ab14',recordObj: {'email': 'ab14', 'pwd': '1234'}}, function(response) {
	console.log(JSON.stringify(response));
});*/

/*jsonDB.getRecordsBySearch({'database': 'test', 'tableName': 'users', key: 'email', value: '123', 'flag': 'endsWith'}, function(response) {
	console.log(JSON.stringify(response));
});*/

/*for (i=0;i<1000;i++) {

jsonDB.batchInsert({'database': 'test', 'tableName': 'users', records: [{'email': 'a'+ i},{'email': 'b' + i},{'email': 'c'+ i}]}, function(response) {
	console.log(JSON.stringify(response));
});
}*/