var db = require('./database.js');

function createDatabase(name, dbPath, callback) {
  db.createDatabase(name, dbPath, function(response) {
  	 callback(response);
  	 return;
  });
}

module.exports.createDatabase = createDatabase;