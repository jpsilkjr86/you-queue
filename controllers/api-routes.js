// imports sequelize db object and its models
const db = require('../models');
// exports as a function which takes in express app paramters
module.exports = (app) => {
	// route for adding data to a test api route
	app.post('/testtable/addrow', (req, res) => {
		db.TestTable.create({test_name: req.body.test_name}).then(result => {
			console.log(result);
			res.send(result);
		}).catch(err => {
			res.send(err);
			console.log(err);
		});
	});
	// route for getting data from test table api route
	app.get('/testtable/all', (req, res) => {
		db.TestTable.findAll({}).then(result => {
			console.log(result);
			res.json(result);
		}).catch(err => {
			res.send(err);
			console.log(err);
		});
	});
	// route for posting user login data
	app.post('/user/login', (req, res) => {
		// console.log(req.body);
		// instantiates local userData as block-scoped object
		let userData = {
			email: req.body.email,
			password: req.body.password
		};
		console.log(userData);
		// checks to see if userData is in the database
		db.TestTable.findOne({where: userData}).then(result => {
			console.log(result);
			res.json(result);
		}).catch(err => {
			res.send('Email and password combination do not match our records.');
			console.log('Email and password combination do not match our records.');
		});
	});
	// route for posting user login data
	app.post('/user/new', (req, res) => {
		// console.log(req.body);
		// instantiates local newUserData as block-scoped object
		let newUserData = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			company_name: req.body.company_name,
			phone_number: req.body.phone_number,
			email: req.body.email,
			password: req.body.password
		};
		console.log(newUserData);
		// checks to see if newUserData is in the database
		db.TestTable.create(newUserData).then(result => {
			console.log('User successfully created!');
			res.json('User successfully created!');
		}).catch(err => {
			res.send(err);
			console.log(err);
		});
	});
};