var db = require('./database.js');
var tables = require('./tables.js');

function createDatabase(options, callback) {
  db.createDatabase(options, function(response) {
  	 callback(response);
  	 return;
  });
}

function dropDatabase(name, callback) {
  db.dropDatabase(name, function(response) {
  	 callback(response);
  	 return;
  });
}

function createTable(options, callback) {
  tables.createTable(options, function(response) {
  	 callback(response);
  	 return;
  });
}

function dropTable(options, callback) {
  tables.dropTable(options, function(response) {
  	 callback(response);
  	 return;
  });
}

function insertRecord(options, callback) {
  tables.insertRecord(options, function(response) {
     callback(response);
     return;
  });
}

function getRecordById(options, callback) {
  tables.getRecordById(options, function(response) {
     callback(response);
     return;
  });
}

function getRecordByKeyValue(options, callback) {
  tables.getRecordByKeyValue(options, function(response) {
     callback(response);
     return;
  });
}

function getRecordByObject(options, callback) {
  tables.getRecordByObject(options, function(response) {
     callback(response);
     return;
  });
}

function getAllRecords(options, callback) {
  tables.getAllRecords(options, function(response) {
     callback(response);
     return;
  });
}

function deleteRecordById(options, callback) {
  tables.deleteRecordById(options, function(response) {
     callback(response);
     return;
  });
}

module.exports.createDatabase = createDatabase;
module.exports.dropDatabase = dropDatabase;
module.exports.createTable = createTable;
module.exports.dropTable = dropTable;
module.exports.insertRecord = insertRecord;
module.exports.getRecordById = getRecordById;
module.exports.getRecordByKeyValue = getRecordByKeyValue;
module.exports.getRecordByObject = getRecordByObject;
module.exports.getAllRecords = getAllRecords;
module.exports.deleteRecordById = deleteRecordById;
