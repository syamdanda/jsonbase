const utils = require('./utils/utils').utils;
const fs = require('fs');
const rimraf = require('rimraf');
const ora = require('ora');
const spinner = ora('Processing');

const CONSTANTS = utils.CONSTANTS;
const REQUEST_CODES = CONSTANTS.REQUEST_CODES;
const VALIDATE = utils.CONSTANTS.VALIDATE;
const validate = utils.validate;
const _ = require('underscore');

const configFileName = 'jsonDB-config.json';
const flagValues = ['beginsWith', 'endsWith', 'contains'];

function createTable(options, callback) {
	spinner.start();
	let errorList = [];
	let tableName = options.tableName;
	let database = options.database;

	if (! tableName) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			let e = {
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
		let basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	let filePath = basePath + utils.getFileSeparator() + tableName + '.json';
		    	fs.exists(filePath, function(exists) {
		    	    if (exists) {
		    	    	callback({
		    	    			status: REQUEST_CODES.FAIL,
		    	    			error: 'table exists with the given name'
		    	    	});
		    	    	return;
		    	    } else {
    				    fs.writeFile(filePath, '{}', function(err) {
    				        if(err) {
    				            callback({
    	        		       		status: REQUEST_CODES.FAIL,
    	        		       		msg: 'Error while creating file',
    	        		       		error: err

    	        		       });
    	        		       return;
    				        } else {
    				        	let configFilePath = basePath + utils.getFileSeparator() + configFileName;
    	        	        	let configFileObj;
    	        	        	try {
    	        					configFileObj = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
    	        					let currentDBConfigs = _.findWhere(configFileObj['databases'], {name: database});
    	        					currentDBConfigs['tables'].push(tableName);
    					        	fs.writeFile(configFilePath, JSON.stringify(configFileObj), function(err) {
    					        		spinner.stop();
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
    	        				} catch (e) {
    	        	    			spinner.color = 'yellow';
									spinner.text = 'Waiting...';
    	        	    			setTimeout(function() {
    	        	    				createTable(options, function(resp) {
    	        	    					callback(resp);
    	        	    				})
    	        	    			}, 1000);
    	        	    			return;
    	        	    		}		        	
    				        }
    				    });
		    	    }
		    	});			    		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function dropTable(options, callback) {
	let errorList = [];
	let tableName = options.tableName;
	let database = options.database;

	if (! tableName) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			let e = {
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
		let basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	let filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	let tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
			        	fs.unlink(tablePath, function (err) {            
							if (err) {                                                 
							  callback({
		          		       		status: REQUEST_CODES.FAIL,
		          		       		msg: 'error while droping table - ' + tableName,
		          		       		error: err

	          		       		});
	          		       		return;                                    
							} else {
								let configFilePath = basePath + utils.getFileSeparator() + configFileName;
								let configFileObj;
		        	        	try {
		        					configFileObj = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
									let currentDBConfigs = _.findWhere(configFileObj['databases'], {name: database});
									const index = currentDBConfigs['tables'].indexOf(tableName);
									if (index > -1) {
									  	currentDBConfigs['tables'].splice(index, 1);
				  			        	fs.writeFile(configFilePath, JSON.stringify(configFileObj), function(err) {
				  			        		spinner.stop();
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
				      	        		       		msg: 'table dropped successfully with table name ' + tableName
				      	        		       });
				      	        		       return;
				  			        	    }
				  			        	});
									}
		        				} catch (e) {
		        	    			spinner.color = 'yellow';
									spinner.text = 'Waiting...';
		        	    			setTimeout(function() {
		        	    				dropTable(options, function(resp) {
		        	    					callback(resp);
		        	    				})
		        	    			}, 1000);
		        	    			return;
		        	    		}								
							}                                                        
						});		        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function insertRecord(options, callback) {
	spinner.start();
	let errorList = [];
	let recordObj = options.record;
	let tableName = options.tableName;
	let database = options.database;

	if (! tableName) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! recordObj || undefined == recordObj || !Object.keys(recordObj).length) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'record')
		};
		errorList.push(e);
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		let basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	let filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	let tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
			        	let tableObj;
			        	try {
			        		tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
			        		let docId = utils.generateDocIdByTable(tableObj) + '';
			        		recordObj['_ObjId'] = docId;
			        		tableObj[docId] = recordObj;
				        	fs.writeFile(tablePath, JSON.stringify(tableObj), function(err) {
				        		spinner.stop();
				        	    if(err) {
				        	        callback({
	                		       		status: REQUEST_CODES.FAIL,
	                		       		msg: 'Error while insert record into table',
	                		       		error: err

	                		       });
	                		       return;
				        	    } else {				        	    	
	    				            callback({
	    	        		       		status: REQUEST_CODES.SUCCESS,
	    	        		       		msg: 'record inserted successfully with the documentId ' + docId
	    	        		       });
	    	        		       return;
				        	    }
				        	});
			        	} catch (e) {
        	    			spinner.color = 'yellow';
        	    			spinner.text = 'Waiting for file operation';
        	    			setTimeout(function() {
        	    				insertRecord(options, function(resp) {
        	    					callback(resp);
        	    				})
        	    			}, 1000);
        	    			return;
        	    		}		        																        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function batchInsert(options, callback) {
	spinner.start();
	let errorList = [];
	let recordObjs = options.records;
	let tableName = options.tableName;
	let database = options.database;

	if (! tableName) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! recordObjs || undefined == recordObjs || !recordObjs.length) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'records')
		};
		errorList.push(e);
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		let basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	let filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	let tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
			        	let tableObj;
			        	try {
			        		let lastIndex = recordObjs.length;
			        		let insertCount = 0;
			        		recordObjs.forEach(function(recordObj) {
			        			setTimeout(function() {
			        				options['record'] = recordObj;
				        			insertRecord(options, function(response) {
				        				insertCount = insertCount + 1;
				        				lastIndex = lastIndex - 1;
					        	    	if (lastIndex <= 0) {
					        	    		spinner.stop();
    	    					            callback({
    	    		        		       		status: REQUEST_CODES.SUCCESS,
    	    		        		       		msg: 'successfully inserted ' + insertCount + ' records'
    	    		        		       });
    	    		        		       return;
					        	    	}
				        			});				        						        			
						        }, 25);			        							        	
			        		});				        	
			        	} catch (e) {
        	    			spinner.color = 'yellow';
        	    			spinner.text = 'Waiting for file operation';
        	    			setTimeout(function() {
        	    				batchInsert(options, function(resp) {
        	    					callback(resp);
        	    				})
        	    			}, 1000);
        	    			return;
        	    		}		        																        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function getRecordById(options, callback) {
	spinner.start();
	let errorList = [];
	let recordId = options.recordId;
	let tableName = options.tableName;
	let database = options.database;

	if (! tableName) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! recordId) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'record')
		};
		errorList.push(e);
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		let basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	let filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	let tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
			        	let tableObj;
			        	try {
							tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
							let record  = tableObj[recordId];
							spinner.stop();
				            callback({
	        		       		status: REQUEST_CODES.SUCCESS,
	        		       		result: record
	        		       });
	        		       return;
			        	} catch (e) {
        	    			spinner.color = 'yellow';
							spinner.text = 'Waiting...';
        	    			setTimeout(function() {
        	    				getRecordById(options, function(resp) {
        	    					callback(resp);
        	    				})
        	    			}, 1000);
        	    			return;
        	    		}																				        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function getRecordByKeyValue(options, callback) {
	spinner.start();
	let errorList = [];
	let key = options.key;
	let value = options['value'];
	let tableName = options.tableName;
	let database = options.database;

	if (! tableName) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! key) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'key')
		};
		errorList.push(e);
	}
	if (! value) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'value')
		};
		errorList.push(e);
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		let basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	let filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	let tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
						let tableObj;
						try {
							tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
							let filter = {};
							filter[key] = value;
							let arrayObj = Object.values(tableObj);
							let records  = _.where(arrayObj, filter);
							spinner.stop();
				            callback({
	        		       		status: REQUEST_CODES.SUCCESS,
	        		       		result: records
	        		       });
	        		       return;
	        		    }  catch (e) {
        	    			spinner.color = 'yellow';
							spinner.text = 'Waiting...';
        	    			setTimeout(function() {
        	    				getRecordByKeyValue(options, function(resp) {
        	    					callback(resp);
        	    				})
        	    			}, 1000);
        	    			return;
        	    		}
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function getRecordsBySearch(options, callback) {
	spinner.start();
	let errorList = [];
	let key = options.key;
	let value = options['value']  +'';
	let flag = options.flag;
	let tableName = options.tableName;
	let database = options.database;

	if (! tableName) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! key) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'key')
		};
		errorList.push(e);
	}
	if (! value) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'value')
		};
		errorList.push(e);
	}

	if (! flag) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'flag')
		};
		errorList.push(e);
	} else  {
		if (!_.some(flagValues, function(value) { return value == flag;})) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FLAG_VALUE_INVALID, 'flag')
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
		let basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	let filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	let tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
						let tableObj;
						try {
							tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));							
							let arrayObj = Object.values(tableObj);
							let records;
							switch(value) {
							  case 'beginsWith':
							    records  = _.filter(arrayObj, function(d){ return d[key].startsWith(value); });
							    break;
							  case 'endsWith':
							    records  = _.filter(arrayObj, function(d){ return d[key].endsWith(value); });
							    break;
							  default:
							    records  = _.filter(arrayObj, function(d){return d[key].includes(value); });
							}
							spinner.stop();
				            callback({
	        		       		status: REQUEST_CODES.SUCCESS,
	        		       		result: records
	        		       });
	        		       return;
	        		    }  catch (e) {
	        		    	console.log('e ;;', e);
        	    			spinner.color = 'yellow';
							spinner.text = 'Waiting...';
        	    			setTimeout(function() {
        	    				getRecordsBySearch(options, function(resp) {
        	    					callback(resp);
        	    				})
        	    			}, 1000);
        	    			return;
        	    		}
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function getRecordByObject(options, callback) {
	spinner.start();
	let errorList = [];
	let obj = options.obj;
	let tableName = options.tableName;
	let database = options.database;

	if (! tableName) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! obj || undefined == obj || !Object.keys(obj).length) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'obj')
		};
		errorList.push(e);
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		let basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	let filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	let tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
			        	try {
							let tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
							let filter = {};
							let arrayObj = Object.values(tableObj);
							Object.keys(obj).forEach(function(key) {
								filter[key] = obj[key];
							})
							let records  = _.where(arrayObj, filter);
							spinner.stop();
				            callback({
	        		       		status: REQUEST_CODES.SUCCESS,
	        		       		result: records
	        		       });
	        		       return;
			        	}  catch (e) {
        	    			spinner.color = 'yellow';
							spinner.text = 'Waiting...';
        	    			setTimeout(function() {
        	    				getRecordByObject(options, function(resp) {
        	    					callback(resp);
        	    				})
        	    			}, 1000);
        	    			return;
        	    		}																				        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function getAllRecords(options, callback) {
	spinner.start();
	let errorList = [];
	let tableName = options.tableName;
	let database = options.database;

	if (! tableName) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			let e = {
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
		let basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	let filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	try {
				        	let tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
							let tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
							let filter = {};
							let arrayObj = Object.values(tableObj);
							spinner.stop();
				            callback({
	        		       		status: REQUEST_CODES.SUCCESS,
	        		       		result: arrayObj
	        		       });
	        		       return;
			        	}  catch (e) {
        	    			spinner.color = 'yellow';
							spinner.text = 'Waiting...';
        	    			setTimeout(function() {
        	    				getAllRecords(options, function(resp) {
        	    					callback(resp);
        	    				})
        	    			}, 1000);
        	    			return;
        	    		}			        															        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function deleteRecordById(options, callback) {
	spinner.start();
	let errorList = [];
	let recordId = options.recordId;
	let tableName = options.tableName;
	let database = options.database;

	if (! tableName) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! recordId) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'record')
		};
		errorList.push(e);
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		let basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	let filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	try {
				        	let tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
							let tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
							delete tableObj[recordId];
				        	fs.writeFile(tablePath, JSON.stringify(tableObj), function(err) {
				        		spinner.stop();
				        	    if(err) {
				        	        callback({
	                		       		status: REQUEST_CODES.FAIL,
	                		       		msg: 'Error while deleting record from table',
	                		       		error: err

	                		       });
	                		       return;
				        	    } else {
	    				            callback({
	    	        		       		status: REQUEST_CODES.SUCCESS,
	    	        		       		msg: 'record deleted successfully with the recordId ' + recordId
	    	        		       });
	    	        		       return;
				        	    }
				        	});
			        	}  catch (e) {
        	    			spinner.color = 'yellow';
							spinner.text = 'Waiting...';
        	    			setTimeout(function() {
        	    				deleteRecordById(options, function(resp) {
        	    					callback(resp);
        	    				})
        	    			}, 1000);
        	    			return;
        	    		}			        													        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function deleteRecordByKeyValue(options, callback) {
	spinner.start();
	let errorList = [];
	let key = options.key;
	let value = options['value'];
	let tableName = options.tableName;
	let database = options.database;

	if (! tableName) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! key) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'key')
		};
		errorList.push(e);
	}
	if (! value) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'value')
		};
		errorList.push(e);
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		let basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	let filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	try {
    			        	let tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
    						let tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
    						let filter = {};
    						filter[key] = value;
    						let arrayObj = Object.values(tableObj);
    						let records  = _.where(arrayObj, filter);
    						if (records && records.length) {
    							let lastIndex = records.length;
    							records.forEach(function(record) {
    								delete tableObj[Object.keys(tableObj).find(key => tableObj[key] === record) + ''];
    								lastIndex = lastIndex -1;
    								if (lastIndex <= 0) {   
    									fs.writeFile(tablePath, JSON.stringify(tableObj), function(err) {
    										spinner.stop();
    						        	    if(err) {
    						        	        callback({
    			                		       		status: REQUEST_CODES.FAIL,
    			                		       		msg: 'Error while deleting record from table',
    			                		       		error: err

    			                		       });
    			                		       return;
    						        	    } else {
    			    				            callback({
    			    	        		       		status: REQUEST_CODES.SUCCESS,
    			    	        		       		msg: 'Deleted records successfully, Total matched records :  ' + records.length 
    			    	        		       });
    			    	        		       return;
    						        	    }
    						        	});
    								}
    							});
    						} else {
    					            callback({
    		        		       		status: REQUEST_CODES.SUCCESS,
    		        		       		msg: 'No matching records found to delete with the given filter condition ' + JSON.stringify(filter)
    		        		       });
    		        		       return;
    						}
			        	}  catch (e) {
        	    			spinner.color = 'yellow';
							spinner.text = 'Waiting...';
        	    			setTimeout(function() {
        	    				deleteRecordByKeyValue(options, function(resp) {
        	    					callback(resp);
        	    				})
        	    			}, 1000);
        	    			return;
        	    		}
			        										            
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function updateRecordById(options, callback) {
	spinner.start();
	let errorList = [];
	let recordId = options.recordId;
	let recordObj = options.recordObj;
	let tableName = options.tableName;
	let database = options.database;

	if (! tableName) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! recordId) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'recordId')
		};
		errorList.push(e);
	}

	if (! recordObj || undefined == recordObj || !Object.keys(recordObj).length) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'recordObj')
		};
		errorList.push(e);
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		let basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	let filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	try {
    			        	let tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
    						let tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
    						let record  = tableObj[recordId];
    						let keys = Object.keys(recordObj);
    						let lastIndex = keys.length;
    						keys.forEach(function(key) {
    							lastIndex = lastIndex - 1;
    							record[key] = recordObj[key];
    							if (lastIndex <= 0) {
    								tableObj[recordId] = record;
    								fs.writeFile(tablePath, JSON.stringify(tableObj), function(err) {
    									spinner.stop();
    					        	    if(err) {
    					        	        callback({
    		                		       		status: REQUEST_CODES.FAIL,
    		                		       		msg: 'Error while updating record',
    		                		       		error: err

    		                		       });
    		                		       return;
    					        	    } else {
    		    				            callback({
    		    	        		       		status: REQUEST_CODES.SUCCESS,
    		    	        		       		msg: 'record updated successfully'
    		    	        		       });
    		    	        		       return;
    					        	    }
    					        	});
    							}
    						});
			        	}  catch (e) {
        	    			spinner.color = 'yellow';
							spinner.text = 'Waiting...';
        	    			setTimeout(function() {
        	    				updateRecordById(options, function(resp) {
        	    					callback(resp);
        	    				})
        	    			}, 1000);
        	    			return;
        	    		}																		        	
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

function updateRecordByKeyValue(options, callback) {
	spinner.start();
	let errorList = [];
	let key = options.key;
	let value = options['value'];
	let recordObj = options.recordObj;
	let tableName = options.tableName;
	let database = options.database;

	if (! tableName) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'tableName')
		};
		errorList.push(e);
	} else  {
		if (tableName.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'tableName')
			};
			errorList.push(e);
		} else if (tableName.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'tableName')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(tableName)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'tableName')
			};
			errorList.push(e);
		}
	}

	if (! database) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'database')
		};
		errorList.push(e);
	} else  {
		if (database.length < 2) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_SMALL, 'database')
			};
			errorList.push(e);
		} else if (database.length > 20) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.VALUE_TOO_BIG, 'database')
			};
			errorList.push(e);
		} 
		if (! validate.isValidString(database)) {
			let e = {
				status: VALIDATE.FAIL,
				error: utils.formatText(VALIDATE.FIELD_VALUE_INVALID, 'database')
			};
			errorList.push(e);
		}
	}

	if (! key) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'key')
		};
		errorList.push(e);
	}
	if (! value) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'value')
		};
		errorList.push(e);
	}

	if (! recordObj || undefined == recordObj || !Object.keys(recordObj).length) {
		let e = {
			status: VALIDATE.FAIL,
			error: utils.formatText(VALIDATE.REQUIRED, 'recordObj')
		};
		errorList.push(e);
	}

	if (errorList.length) {
		callback({
			status: REQUEST_CODES.FAIL,
			error: errorList
		});
		return;
	} else {
		let basePath = utils.getRootPath() + utils.getFileSeparator() + database;
		fs.exists(basePath, function(exists) {
		    if (exists) {
		    	let filePath = basePath + utils.getFileSeparator() + tableName;
			    fs.exists(filePath, function(err) { //check file exists or not
			        if(err) {
			            callback({
        		       		status: REQUEST_CODES.FAIL,
        		       		msg: 'No table exists with the given name - ' + tableName,
        		       		error: err

        		       });
        		       return;
			        } else {
			        	let tablePath = basePath + utils.getFileSeparator() + tableName + '.json';
						let tableObj;
						try {
							tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
							let filter = {};
							filter[key] = value;
							let arrayObj = Object.values(tableObj);
							let records  = _.where(arrayObj, filter);
							if (records && records.length) {
								let recordIndex = records.length;
								records.forEach(function(record) {
									let keys = Object.keys(recordObj);
									let lastIndex = keys.length;
									keys.forEach(function(key) {
										lastIndex = lastIndex - 1;
										record[key] = recordObj[key];
										if (lastIndex <= 0) {
											tableObj[record._ObjId] = record;
											recordIndex = recordIndex - 1;
											if (recordIndex <= 0) {
												fs.writeFile(tablePath, JSON.stringify(tableObj), function(err) {
													spinner.stop();
									        	    if(err) {
									        	        callback({
						                		       		status: REQUEST_CODES.FAIL,
						                		       		msg: 'Error while updating record',
						                		       		error: err

						                		       });
						                		       return;
									        	    } else {
						    				            callback({
						    	        		       		status: REQUEST_CODES.SUCCESS,
						    	        		       		msg: 'record updated successfully'
						    	        		       });
						    	        		       return;
									        	    }
									        	});
											}											
										}
									});
								});
							} else {
					            callback({
		        		       		status: REQUEST_CODES.SUCCESS,
		        		       		msg: 'no records found'
		        		       	});
		        		       return;
							}    						
	        		    }  catch (e) {
        	    			spinner.color = 'yellow';
							spinner.text = 'Waiting...';
        	    			setTimeout(function() {
        	    				updateRecordByKeyValue(options, function(resp) {
        	    					callback(resp);
        	    				})
        	    			}, 1000);
        	    			return;
        	    		}
			        }
			    });		       
		    } else {
		    	callback({
		    			status: REQUEST_CODES.FAIL,
		    			error: 'No database exists with the given name'
		    	});
		    	return;
		    }
		});		
	}
}

module.exports.createTable = createTable;
module.exports.dropTable = dropTable;

module.exports.insertRecord = insertRecord;
module.exports.batchInsert = batchInsert;


module.exports.deleteRecordById = deleteRecordById;
module.exports.deleteRecordByKeyValue = deleteRecordByKeyValue;

module.exports.getRecordById = getRecordById;
module.exports.getRecordByKeyValue = getRecordByKeyValue;
module.exports.getRecordByObject = getRecordByObject;
module.exports.getAllRecords = getAllRecords;
module.exports.getRecordsBySearch = getRecordsBySearch;

module.exports.updateRecordById = updateRecordById;
module.exports.updateRecordByKeyValue = updateRecordByKeyValue;
