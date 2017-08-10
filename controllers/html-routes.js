// imports path npm
const path = require('path');

const testData = [];
testData.push({
	first_name: 'joe',
	last_name: 'doe',
	email: 'joedoe@a.com',
	password: 'a',
	phone_number: 123,
	company_name: 'abc'
});
testData.push({
	first_name: 'paul',
	last_name: 'poe',
	email: 'paulpoe@a.com',
	password: 'b',
	phone_number: 456,
	company_name: 'def'
});

const db = require('../models');

// exports is a function that takes in app as an argument
module.exports = function (app) {
	// html route for index
	app.get('/', (req, res) => {
		// render according to arrays
		res.render('index', {title: 'You-Queue: Home'});
	});

	// html route for login page
	app.get('/login', (req, res) => {
		// render according to arrays
		res.render('login', {title: 'You-Queue: Welcome!'});
	});

	// html route for queue dashboard page
	app.get('/dashboard', (req, res) => {
		// render handlebars according to object data
		db.TestTable.findAll({}).then(function(results) {
		res.render('dashboard', {title: 'You-Queue: Dashboard', testtables: results});
		});
	});

	app.get('/index', (req, res) => {
		// render handlebars according to object data
		res.render('index', {title: 'You-Queue: Index'});
	});

}