// imports path npm
const path = require('path');

// exports is a function that takes in app as an argument
module.exports = function (app) {
	// html route for index
	app.get('/', (req, res) => {
		// render handlebars according to object data
		res.render('index', {title: 'You-Queue: Home'});
	});
	// html route for login page
	app.get('/login', (req, res) => {
		// render handlebars according to object data
		res.render('login', {title: 'You-Queue: Welcome!'});
	});
	// html route for login page
	app.get('/dashboard', (req, res) => {
		// render handlebars according to object data
		res.render('dashboard', {title: 'You-Queue Dashboard'});
	});
}
