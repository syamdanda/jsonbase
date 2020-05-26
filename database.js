
// All functionalities related to database


var utils = require('../../assets/utils').utils;
var CONSTANTS = utils.CONSTANTS;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var VALIDATE = utils.CONSTANTS.VALIDATE;
var validate = utils.validate;

function createDatabase(name, path, callback) {
	var errorList = [];

	if (! name) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'name')
		};
		errorList.push(e);
	} else if (name.length < 2) {
		var e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'name')
		};
		errorList.push(e);
	}
}