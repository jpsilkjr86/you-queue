// imports path npm
const path = require('path');

// exports is a function that takes in app as an argument
module.exports = app => {
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
	// html route for queue dashboard page
	app.get('/dashboard', (req, res) => {
		// redirects to signin if no user is logged in
		if (!req.user) {
			res.redirect('/signin');
		}
		else {
			// render handlebars according to object data
			res.render('dashboard', {
				title: 'You-Queue Dashboard',
				user: req.user
			});
		}
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
}
