// imports path npm
const path = require('path');

// exports is a function that takes in app as an argument
module.exports = function (app) {
	// html route for index
	app.get('/', (req, res) => {
		// render according to arrays
		res.render('index', {title: 'You-Queue: Home'});
	});

}
