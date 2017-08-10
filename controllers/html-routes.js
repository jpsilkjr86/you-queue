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

// exports is a function that takes in app as an argument
module.exports = (app, db) => {
	// html route for index
	app.get('/', (req, res) => {
		// render handlebars according to object data
		res.render('index', {
			title: 'You-Queue: Home',
			user: req.user
		});
	});
	// html route for login page
	app.get('/signin', (req, res) => {
		// render handlebars according to object data
		res.render('signin', {
			title: 'You-Queue: Welcome!',
			user: req.user
		});
	});
	// // html route for queue dashboard page
	// app.get('/dashboard', (req, res) => {
	// 	// redirects to signin if no user is logged in
		// if (!req.user) {
		// 	res.redirect('/signin');
		// }
		// else {
		// 	// render handlebars according to object data
		// 	res.render('dashboard', {
		// 		title: 'You-Queue Dashboard',
		// 		user: req.user
		// 	});
		// }
	// });

	// logs user out of site, deleting them from the session, and returns to homepage
	app.get('/logout', (req, res) => {
		if (req.user) {
			let name = req.user.first_name;
			console.log("LOGGING OUT " + name);
			req.logout();
			req.session.notice = "Log out successful. Please visit us again, " + name + "!";
		}
		res.redirect('/');
	});

	// html route for queue dashboard page
	app.get('/dashboard', (req, res) => {
		if (!req.user) {
			res.redirect('/signin');
		}
		else {
			// render handlebars according to results from query
			db.TestTable.findAll({}).then(function(results) {
				res.render('dashboard', {
					title: 'You-Queue: Dashboard',
					testtables: results,
					user: req.user
				});
			});
		}
	});

	app.get('/index', (req, res) => {
		// render handlebars according to object data
		res.render('index', {title: 'You-Queue: Index'});
	});

	app.get('/addcustomer', (req, res) => {
		if (!req.user) {
			res.redirect('/signin');
		}
		else {
			// render handlebars according to object data
			res.render('addcustomer', {
				title: 'You-Queue: Add Customer',
				user: req.user
			});
		}			
	});

	// html route for queue dashboard page
	app.get('/dashboard2', (req, res) => {
		if (!req.user) {
			res.redirect('/signin');
		}
		else {
			// render handlebars according to results from query
			db.TestTable.findAll({}).then(function(results) {
				res.render('dashboard2', {
					title: 'You-Queue: Dashboard',
					testtables: results,
					user: req.user
				});
			});
		}
	});

}