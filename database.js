
// All functionalities related to database


const utils = require('./utils/utils').utils;
const fs = require('fs');
const rimraf = require('rimraf');

const CONSTANTS = utils.CONSTANTS;
const REQUEST_CODES = CONSTANTS.REQUEST_CODES;
const VALIDATE = utils.CONSTANTS.VALIDATE;
const validate = utils.validate;

function createDatabase(options, callback) {
	let errorList = [];
	let name = options.name;
	let path = options.path;
	if (! name) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'name')
		};
		errorList.push(e);
	} else  {
		if (name.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'name')
			};
			errorList.push(e);
		} else if (name.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'name')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(name)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'name')
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
		let basePath;
		if (! path) {
			basePath = utils.getRootPath() + utils.getFileSeparator() + name;			
		} else {
			basePath = path + utils.getFileSeparator() + name;
		}

		fs.exists(basePath, function(exists) {
		    if (exists) {
		       callback({
		       		status: REQUEST_CODES.FAIL,
		       		error: 'folder exists already'
		       });
		       return;
		    } else {
			    fs.mkdir(basePath,function(e){
			        if(e ){
			            callback({
			            	status: REQUEST_CODES.FAIL,
			            	error: e
			            });
			            return;
			        } else {
			        	let configTemplate = utils.getConfigFileTemplate();

			        	let db = {
			        		'name': name,
			        		'path': basePath,
			        		'tables': []
			        	};			        	
			        	configTemplate['databases'].push(db);
			        	let data = JSON.stringify(configTemplate);
			        	fs.writeFileSync(basePath + utils.getFileSeparator() + 'jsonDB-config.json', data);
			            callback({
	            			status: REQUEST_CODES.SUCCESS,
	            			msg: 'database created successfully'
	            		});
	            		return;
			        }
			    });
		    }
		});		
	}
}

function dropDatabase(name, callback) {
	let errorList = [];
	if (! name) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'name')
		};
		errorList.push(e);
	} else  {
		if (name.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'name')
			};
			errorList.push(e);
		} else if (name.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'name')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(name)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'name')
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
		let basePath = utils.getRootPath() + utils.getFileSeparator() + name;
		fs.exists(basePath, function(exists) {
		    if (exists) {
		       rimraf(basePath, function () { 
		       	callback({
		       			status: REQUEST_CODES.SUCCESS,
		       			error: 'Database deleted with the given name ' + name
		       	});
		       	return;
		       });
		    } else {
			    callback({
			    		status: REQUEST_CODES.FAIL,
			    		error: 'No database exists with the given name ' + name
			    });
			    return;
		    }
		});


	}

}

module.exports.createDatabase = createDatabase;
module.exports.dropDatabase = dropDatabase;