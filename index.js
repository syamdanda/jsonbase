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

module.exports.createDatabase = createDatabase;