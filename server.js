// ================ Dependencies ================
const express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require("method-override"),
    exphbs = require('express-handlebars'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    bcrypt = require('bcryptjs'); // for encryption

// sets up express app
const app = express();
const port = process.env.PORT || 3000;

// ================ Custom Modules ================
// imports sequelize db object for initializing database
const db = require('./models');

// ================ Passport ================
// Passport session setup
passport.serializeUser((user, done) => {
	console.log("serializing " + user.email);
	done(null, user);
});

passport.deserializeUser((obj, done) => {
	console.log("deserializing " + obj);
	done(null, obj);
});

// Sets up sign-in LocalStrategy within Passport
passport.use('local-signin', new LocalStrategy({
    passReqToCallback : true, //allows us to pass back the request to the callback
    usernameField: 'email' // changes default 'username' to be 'email' instead
	}, (req, email, password, done) => {
		// checks database for user by email
		db.UserTable.findOne({where: {'email' : email}}).then(user => {
			// if no result is found, return done(null, false), set session msg
			if (user == null) {
				console.log("USER NOT FOUND:", email);
				req.session.notice = 'No user exists with that email address.'
								+ ' Please try again or create a new account.';
				return done(null, false);
			}
			console.log("FOUND USER: " + user.email);
			// saves encrypted password as locally scoped variable
			const hash = user.password;
			// uses bcrypt to see if password matches hash. if so, returns done(null, user)
			if (bcrypt.compareSync(password, hash)) {
				console.log("PASSWORD MATCHED!");
				console.log("LOGGED IN AS: " + user.email);
				req.session.success = 'You are successfully logged in as ' + user.email + '!';
				return done(null, user);
			}
			// if strategy reaches this point, it must mean the password doesn't match
			console.log("PASSWORD DOESN'T MATCH");
			req.session.notice = 'Password is incorrect. Please try again.';
			return done(null, false);
		}).catch(err => {
			// sends and returns error if database throws an error
			console.log("SERVER ERROR");
			req.session.error = 'Server error.';
			return done(err);
		}); // end of sequelize query promise
	} //end of passport callback
)); // end of passport.use
// Sets up sign-up LocalStrategy within Passport
passport.use('local-signup', new LocalStrategy({
	passReqToCallback : true, //allows us to pass back the request to the callback
	usernameField: 'email' // changes default 'username' to be 'email' instead
	}, (req, email, password, done) => {
		// first searches to see if email exists in database
		db.UserTable.findOne({where: {email: email}}).then(user => {
			// if user comes up null, display fail messages and return done(null, false)
			if (user != null) {
				console.log("USER ALREADY EXISTS:" + email);
				req.session.notice = "An account has already been created with"
								+ " that email address. Please try another one."
				return done(null, false);
				// throw new Error("USER ALREADY EXISTS:" + email);
			}
			else {
				// instantiates locally scoped constables, encrypts password argument.
				// values come from email parameter, hash (encrypted pw), and req.body
				const hash = bcrypt.hashSync(password, 8);
				const newUser = {
					email: email,
					password: hash,
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					company_name: req.body.company_name,
					phone_number: req.body.phone_number
				};
				console.log("CREATING USER: " + email + "...");
				// attempts to insert new user into database.
				db.UserTable.create(newUser).then(result => {
					// if user was successfully able to create an account, display success
					// message and return done(null, user)
					console.log('ACCOUNT SUCCESSFULLY CREATED! ' + email);
					req.session.success = "Account successfully created! Signed in as: " + email;
					return done(null, newUser);
				}).catch(err => {
					// checks error object to see if it has useful validation messages to display.
					if (err.hasOwnProperty(errors)) {
						console.log(err.errors[0]);
						req.session.notice = 'Invalid input at one or more values. Please try again.';
					} else {
						req.session.notice = 'Failed to create user. Please try again later.';
					}
					// always returns done(err)
					console.log(err);
					return done(err);
				});
			} // end of else
		// if an error was thrown then display server error messages
		}).catch(err => {
			console.log(err);
			console.log('FAILED TO CREATE USER:', email);
			req.session.error = 'Server error: Failed to create new user account.'
								+ ' Please try again later.';
			return done(err);
		}); // end of sequelize promise chain
	} // end of passport callback
)); // end of passport.use

// ================ Express Configuration ================
// Configures Express and body parser
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'tallyak', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use((req, res, next) => {
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

// serves public directory as static, enabling html pages to link with their assets
app.use(express.static("public"));

// Handlebars Engine Configuration
// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
// Sets handlebars as rendering engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ================ Connection Establishment ================
// attempts to establish connection to mysql server
db.sequelize.sync().then(() => {
	// listens to port for running server
	app.listen(port, () => {
		console.log('App listening on port ' + port);
		// sets up routes
		require('./controllers/html-routes.js')(app, db);
		require('./controllers/api-routes.js')(app, db, passport);
	});
}).catch(err => {
	console.log('Error: Failed to establish connection with MySQL.');
});	