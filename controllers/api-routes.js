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
};