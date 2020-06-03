
var fs = require('fs');
var os = require('os');
var path = require('path');
var uuid = require('uuid-random');
var _ = require('underscore');

module.exports.utils = {
							CONSTANTS: require('./constants').CONSTANTS,
							validate: require('./validate').validate,
							cloneObject: function(object) {
								 var cloneObject = {};
								 Object.keys(object).forEach(function(key) {
								 	cloneObject[key] = object[key];
								 });	
					    		return cloneObject;
							},
							formatText: function(text) {
								var result = text;
								for (var i = 1; i < arguments.length; i += 1) {
									var re = new RegExp('\\{' + (i-1) + '\\}', 'g');
									result = result.replace(re, arguments[i]);
								}
								return result;
							},
							generateDocId: function(){
								return uuid();
							},
							generateDocIdByTable: function(tablePath) {								
								var tableObj = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
								if (tableObj && undefined != tableObj) {
									if (Object.keys(tableObj).length) {
										var keys = Object.keys(tableObj).map(Number);
										return keys.length ? _.max(keys) + 1 : 1;
									} else {
										return 1;
									}
								} else {
									return 1;
								}
							},
							getSystemTime: function() {
								//return new Date().getTime();
								var date = new Date();
								var yyyy = date.getFullYear().toString();
						        var MM = ("0" + (date.getMonth() + 1)).slice(-2);
						        var dd = ("0" + (date.getDate())).slice(-2);
						        var hh = ("0" + (date.getHours())).slice(-2);
						        var mm = ("0" + (date.getMinutes())).slice(-2);
						        var ss = ("0" + (date.getSeconds())).slice(-2);

						        return yyyy + MM + dd+  hh + mm + ss;
							},
							getRootPath: function() {
								return path.dirname(require.main.filename || process.mainModule.filename);
							},
							getFileSeparator: function() {
								return path.sep;
							},
							getOS: function() {
								return os.type();
							},
							getOSVersion: function() {
								return os.release();
							},
							getOSPlatform: function() {
								return os.platform();
							},
							getRandomNumber: function() {
								//generates 8 digit random integer as string
								return Math.floor((Math.random() * 100000000) + 9999999).toString();
							},
							isNumber: function(n) { 
								return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
							},
							getConfigFileTemplate: function() {
								return { 
								    databases: [

								    ]
								};
							}		
						};