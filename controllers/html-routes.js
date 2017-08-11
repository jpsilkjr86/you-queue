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
		if (req.user) {
			console.log('Logged in as user ' + req.user.email + '. Redirecting to dashboard...');
			res.redirect('/dashboard');
		} else {
			console.log('No logged-in user found. Redirecting to signin page...');
			res.redirect('/signin');
		}
	});
	// html route for login page
	app.get('/signin', (req, res) => {
		// render handlebars according to object data
		res.render('signin', {
			title: 'You-Queue: Welcome!',
			user: req.user
		});
	});

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
			// db.CustTable.findAll({where:{restaurant_id: req.body.id}}).then(function(results) {
			db.CustTable.findAll({
				where: {
					restaurant_id: req.user.id,
					active: true
				}
			}).then(results => {
				res.render('dashboard2', {
					title: 'You-Queue: Dashboard',
					customers: results,
					user: req.user
				});
			});
		}
	});
	// html route for add customer page
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
}