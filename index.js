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

function deleteRecordByKeyValue(options, callback) {
  tables.deleteRecordByKeyValue(options, function(response) {
     callback(response);
     return;
  });
}

function updateRecordById(options, callback) {
  tables.updateRecordById(options, function(response) {
     callback(response);
     return;
  });
}

function updateRecordByKeyValue(options, callback) {
  tables.updateRecordByKeyValue(options, function(response) {
     callback(response);
     return;
  });
}

function getRecordsBySearch(options, callback) {
  tables.getRecordsBySearch(options, function(response) {
     callback(response);
     return;
  });
}

function batchInsert(options, callback) {
  tables.batchInsert(options, function(response) {
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
module.exports.deleteRecordByKeyValue = deleteRecordByKeyValue;
module.exports.updateRecordById = updateRecordById;
module.exports.updateRecordByKeyValue = updateRecordByKeyValue;
module.exports.getRecordsBySearch = getRecordsBySearch;
module.exports.batchInsert = batchInsert;
