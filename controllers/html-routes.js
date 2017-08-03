// imports path npm
const path = require('path');

// exports is a function that takes in app as an argument
module.exports = function (app) {
	// html route for index
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, "../views/index.html"));
	});
}
