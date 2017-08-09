// ================ Dependencies ================
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

// ================ Custom Modules ================
// imports sequelize db object for initializing database
const db = require('./models');
// custom helper functions for user authentication
const authFunct = require('./custom_modules/authentication-functions.js')(db);

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
    authFunct.localAuth(email, password).then(user => {
      if (user) {
        console.log("LOGGED IN AS: " + user.email);
        req.session.success = 'You are successfully logged in ' + user.email + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = 'Could not log user in. Please try again.';
        done(null, user);
      }
    }).catch(err => {
      console.log(err);
    });
  }
));
// Sets up sign-up LocalStrategy within Passport
passport.use('local-signup', new LocalStrategy({
    passReqToCallback : true, //allows us to pass back the request to the callback
    usernameField: 'email' // changes default 'username' to be 'email' instead
  }, (req, email, password, done) => {
    authFunct.localRegNewUser(req.body).then(user => {
      if (user) {
        console.log("REGISTERED: " + user.email);
        req.session.success = 'You are successfully registered and logged in ' + user.email + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT REGISTER");
        req.session.error = 'That email is already in use, please try a different one.';
        done(null, user);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
));

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
		require('./controllers/html-routes.js')(app);
		require('./controllers/api-routes.js')(app, passport);
	});
}).catch(err => {
	console.log('Error: Failed to establish connection with MySQL.');
});	