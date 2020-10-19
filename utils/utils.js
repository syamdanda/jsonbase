
const fs = require('fs');
const os = require('os');
const path = require('path');
const _ = require('underscore');

module.exports.utils = {
							CONSTANTS: require('./constants').CONSTANTS,
							validate: require('./validate').validate,
							cloneObject: function(object) {
								 let cloneObject = {};
								 Object.keys(object).forEach(function(key) {
								 	cloneObject[key] = object[key];
								 });	
					    		return cloneObject;
							},
							formatText: function(text) {
								let result = text;
								for (let i = 1; i < arguments.length; i += 1) {
									let re = new RegExp('\\{' + (i-1) + '\\}', 'g');
									result = result.replace(re, arguments[i]);
								}
								return result;
							},
							generateDocIdByTable: function(tableObj) {								
								if (tableObj && undefined != tableObj) {
									if (Object.keys(tableObj).length) {
										let keys = Object.keys(tableObj).map(Number);
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
								let date = new Date();
								let yyyy = date.getFullYear().toString();
						        let MM = ("0" + (date.getMonth() + 1)).slice(-2);
						        let dd = ("0" + (date.getDate())).slice(-2);
						        let hh = ("0" + (date.getHours())).slice(-2);
						        let mm = ("0" + (date.getMinutes())).slice(-2);
						        let ss = ("0" + (date.getSeconds())).slice(-2);

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