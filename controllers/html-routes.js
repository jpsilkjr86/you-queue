// imports path npm
const path = require('path');

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
			user: req.user,
			scriptLink: 'signin.js'
		});
	});

	// logs user out of site, deleting them from the session, and returns to homepage
	app.get('/logout', (req, res) => {
		if (req.user) {
			let name = req.user.first_name;
			console.log("LOGGING OUT " + name);
			req.session.success = "Log out successful! Please visit us again, " + name + "!";
			req.logout();
		}
		res.redirect('/');
	});
	// html route for queue dashboard page
	app.get('/dashboard', (req, res) => {
		if (!req.user) {
			res.redirect('/signin');
		}
		else {
			// instantiates locally scoped variable
			let restaurant_id;
			// gets restaurant_id by querying user data
			db.UserTable.findOne({
				where: {
					email: req.user.email
				}
			}).then(result => {
				// saves restaurant id as result.id (of user)
				restaurant_id = result.id;
				// returns query of all customers who went to a restaurant and
				// who are currently active. continues promise chain.
				return db.CustTable.findAll({
					where: {
						restaurant_id: restaurant_id,
						active: true
					},
					order: [
            			['createdAt', 'ASC']
        			] 
				});
			}).then(results => {
				// render handlebars according to results from query
				res.render('dashboard2', {
					title: 'You-Queue: Dashboard',
					customers: results,
					user: req.user,
					scriptLink: 'dashboard.js'
				});
			}).catch(err => {
				console.log('ERROR QUERYING DATABASE FOR CUSTOMER DATA. LOGGING OFF..');
				console.log(err);
				req.session.error = "Server error - logging off. Please try again later.";
				// sets session error message
				res.redirect('/logout');
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
				user: req.user,
				scriptLink: 'addcustomer.js'
			});
		}			
	});
}