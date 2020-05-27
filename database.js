
// All functionalities related to database


var utils = require('./utils/utils').utils;
var CONSTANTS = utils.CONSTANTS;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;
var basePath = __dirname;

function createDatabase(name, path, callback) {
	var errorList = [];

	if (! name) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'name')
		};
		errorList.push(e);
	} else  {
		if (name.length < 2) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'name')
			};
			errorList.push(e);
		} else if (name.length > 20) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'name')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(name)) {
			var e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'name')
			};
			errorList.push(e);
		}
	}

	if (errorList.length) {
		console.log('errorList', errorList);
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		console.log('basePath :' + basePath + ';');
	}
}

module.exports.createDatabase = createDatabase;