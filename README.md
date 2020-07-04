# Json-Base

A database software completely built as JSON files in backend. A powerful, portable and simple database works on top of JSON files.
It is like a database software, currently having basic CRUD operation features. You can use this as a backend for your ReST APIs as well. The software is completely free and opensource. We are coming up with new features and providing more updates. The another beautiful advantage with JSON-base is since it is a NPM module, this fits well in your nodeJs applications eco system. if you want to develop quick prototypes/poc or need of a database with minimal requirements then, JSONBASe is an must option that you can consider. However there is a limitation if you go beyond a million records per table.

```diff
@@ Currently in Pre-Alpha Version @@
```


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Checkout the below examples to know how to use the JSON-Base built in APIs.

## Installing

A step by step series of examples that tell you how to get started with JSON-Base

```
npm i @syamdanda/json-base
```

And then import the json-base npm module into your nodejs application

```js
var jsonDB = require('@syamdanda/json-base');
```

## [Documentation](#documentation)

Check-out the below code snippets to use the JSON-Base module in your application.

  - [Database Operations](#database-operations)
  - [Table Operations](#table-operations)

### Database Operations

* To create database

```js
let options = {
  'name': 'myDatabase'
};
jsonDB.createDatabase(options, function(response) {
	console.log(JSON.stringify(response));
});
```

* To delete database

```js
let options = {
  'name': 'myDatabase'
};
jsonDB.dropDatabase(options, function(response) {
	console.log(JSON.stringify(response));
});
```

**[⬆ Back to Top](#documentation)**

* ### Table Operations 
  * To create table

```js
let options = {
  'database': 'myDatabase',
  'tableName': 'Users'
};

jsonDB.createTable(options, function(response) {
	console.log(JSON.stringify(response));
});
```

  * To drop table

```js
let options = {
  'database': 'myDatabase',
  'tableName': 'Users'
};

jsonDB.dropTable(options, function(response) {
	console.log(JSON.stringify(response));
});
```

  * To insert record table

```js
let options = {
  'database': 'myDatabase',
  'tableName': 'Users',
   'record': {'email': 'name@domain.com', 'phone': '+1 1234567890', 'name': 'userName'}
};

jsonDB.insertRecord(options, function(response) {
	console.log(JSON.stringify(response));
});
```

  * To insert more than one record

```js
let options = {
  'database': 'myDatabase',
  'tableName': 'Users',
   'records': [{'email': 'name@domain.com', 'phone': '+1 1234567890', 'name': 'userName'},{'email': 'name2@domain.com', 'phone': '+1 1234567890', 'name': 'userName2'}]
};

jsonDB.batchInsert(options, function(response) {
	console.log(JSON.stringify(response));
});
```

  * To get record by Id

```js
let options = {
  'database': 'myDatabase',
  'tableName': 'Users',
   'recordId': 1
};

jsonDB.getRecordById(options, function(response) {
	console.log(JSON.stringify(response));
});
```

  * To get record by key value
  
  If you want to search and retrieve a record based on some key and value use the below method.

```js
let options = {
  'database': 'myDatabase',
  'tableName': 'Users',
   'key': 'email', 
   'value': 'abc@domain.com'
};

jsonDB.getRecordByKeyValue(options, function(response) {
	console.log(JSON.stringify(response));
});
```

 * To get record by more than one key value or object.
  
  If you want to search and retrieve a record based on more than one key and value use the below method.

```js
let options = {
  'database': 'myDatabase',
  'tableName': 'Users',
   'obj': {'email': 'name@domain.com', 'phone': '+1 1234567890', 'name': 'userName'}
};

jsonDB.getRecordByObject(options, function(response) {
	console.log(JSON.stringify(response));
});
```
* To get records based on search flag
  you can define any one value for flag
    * beginsWith : searches records whose value is begins with the mentioned value for the key
    * endsWith : searches records whose value is endsWith with the mentioned value for the key
    * contains : searches records whose value contains with the mentioned value for the key

```js
let options = {
  'database': 'myDatabase',
  'tableName': 'Users',
  'key': 'email',
  'value': 'gmail',
  'flag': 'contains'
};

jsonDB.getRecordsBySearch(options, function(response) {
	console.log(JSON.stringify(response));
});
```

* To get all records from a table
  

```js
let options = {
  'database': 'myDatabase',
  'tableName': 'Users'
};

jsonDB.getAllRecords(options, function(response) {
  console.log(JSON.stringify(response));
});
```
* To delete record by Id
  
 
```js
let options = {
  'database': 'myDatabase',
  'tableName': 'Users',
   'recordId': 1
};

jsonDB.deleteRecordById(options, function(response) {
	console.log(JSON.stringify(response));
});
```

* To update record by Id
  
 
```js
let options = {
  'database': 'myDatabase',
  'tableName': 'Users',
   'recordId': 1,
   'recordObj': {'email': 'new123', 'pwd': 'password'}
};

jsonDB.updateRecordById(options, function(response) {
	console.log(JSON.stringify(response));
});
```

* To update record by key value
  
 
```js
let options = {
  'database': 'myDatabase',
  'tableName': 'Users',
   'key': 'email',
   'value': 'mymail@domain.com',
   'recordObj': {'email': 'new123', 'pwd': 'password'}
};

jsonDB.updateRecordByKeyValue(options, function(response) {
  console.log(JSON.stringify(response));
});
```

## Contributing

Please read [CONTRIBUTING.md](#) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

*	Issue fixes in 0.1.0 on 01.Jul.2020
*	Added getRecordsBySearch API in 0.0.9 on 01.Jul.2020
*	Documentation and issue fixes in 0.0.8 on 30.Jun.2020
*	Added documentation in 0.0.7 on 29.Jun.2020
*	Current stable version is 0.0.5 which is released on 27.Jun.2020

## Authors

* [Syam Danda](https://github.com/syamdanda)

See also the list of [contributors](https://github.com/Devs-Garden/jsonbase/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
