var utils = require('./utils/utils').utils;
var fs = require('fs');
var rimraf = require('rimraf');

var CONSTANTS = utils.CONSTANTS;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;
var _ = require('underscore')

const configFileName = 'jsonDB-config.json';

function createTable(options, callback) {
	var errorList = [];
	var tableName = options.tableName;
	var database = options.database;

	if (! tableName) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		var basePath = utils.getRootPath() + utils.getFileSeparator() + database;

		fs.exists(basePath, function(exists) {
		    if (exists) {
		       callback({
		       		status: REQUEST_CODES.FAIL,
		       		error: 'No database exists with the given name'
		       });
		       return;
		    } else {
		    	var filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.writeFile(filePath, '[]', function(err) {
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'Error while creating file',
        		       		error: err

        		       });
        		       return;
			        } else {
			        	var configFilePath = basePath + utils.getFileSeparator() + configFileName;
			        	var configFileObj = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
			        	console.log(JSON.stringify(configFileObj, null, 2));
			        	var currentDBConfigs = _.findWhere(configFileObj['databases'], {name: database});
			        	currentDBConfigs['tables'].push(tableName);
			        	console.log(JSON.stringify(configFileObj, null, 2));
			        	fs.writeFile(configFilePath, JSON.stringify(configFileObj), function(err) {
			        	    if(err) {
			        	        callback({
                		       		status: REQUEST_CODES.FAIL,
                		       		msg: 'Error while updating config file',
                		       		error: err

                		       });
                		       return;
			        	    } else {
    				            callback({
    	        		       		status: REQUEST_CODES.SUCCESS,
    	        		       		msg: 'table created successfully with table name ' + tableName
    	        		       });
    	        		       return;
			        	    }
			        	});
			        }
			    });
		    }
		});		
	}
}

module.exports.createTable = createTable;