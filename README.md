# Json-Base

A database software completely built as JSON files in backend. A powerful, portable and simple database works on top of JSON files.
It is like a database which build on top of json files. This isn't an alternative for database, but if you want to develop quick prototypes/poc or need of a database with minimal requirements then, JSONBASe is an must option that you can consider.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Checckout the below examples to know how to use the JSON-Base built in APIs.

## Installing

A step by step series of examples that tell you how to get started with JSON-Base

```
npm i @syamdanda/json-base
```

And then import the json-base npm module into your nodejs application

```
var jsonDB = require('@syamdanda/json-base');
```

## [Documentation](#documentation)

Check-out the below code snippets to use the JSON-Base module in your application.

  - [Database Operations](#database-operations)
  - [Table Operations](#table-operations)

### Database Operations

* To create database

```
let options = {
  'name': 'myDatabase'
};
jsonDB.createDatabase(options, function(response) {
	console.log(JSON.stringify(response));
});
```

* To delete database

```
let options = {
  'name': 'myDatabase'
};
jsonDB.dropDatabase(options, function(response) {
	console.log(JSON.stringify(response));
});
```

**[⬆ Back to Top](#documentation)**

* #### Table operations : 
  * To create table

```
let options = {
  'database': 'myDatabase',
  'tableName': 'Users'
};
jsonDB.createTable(options, function(response) {
	console.log(JSON.stringify(response));
});
```

## Contributing

Please read [CONTRIBUTING.md](#) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

Current stable version is 0.0.5 which is released on 27.Jun.2020

## Authors

* **Syam Danda**(https://github.com/syamdanda)

See also the list of [contributors](https://github.com/Devs-Garden/jsonbase/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
