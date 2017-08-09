// dependencies
const express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require("method-override"),
    exphbs = require('express-handlebars'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local');

// sets up express app
const app = express();
const port = process.env.PORT || 3000;

// sets up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// serves public directory as static, enabling html pages to link with their assets
app.use(express.static("public"));

// ====== FOR IMPORTING HANDLEBARS ======
// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
// Sets handlebars as rendering engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// imports sequelize db object for initializing database
const db = require('./models');

// attempts to establish connection to mysql server
db.sequelize.sync().then(() => {
	// listens to port for running server
	app.listen(port, () => {
		console.log('App listening on port ' + port);
		// sets up routes
		require('./controllers/html-routes.js')(app);
		require('./controllers/api-routes.js')(app);
	});
}).catch(err => {
	console.log(err);
});
	