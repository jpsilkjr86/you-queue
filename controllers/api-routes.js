// exports as a function which takes in express app and passport parameters
module.exports = (app, passport) => {
	// route for signing up new users. authenticates with passport local strategy 'local-signup'
	app.post('/user/new', passport.authenticate('local-signup', {
		successRedirect: '/dashboard',
		failureRedirect: '/signin'
	}));
	// route for signing in. authenticates with passport local strategy 'local-signin'
	app.post('/user/signin', passport.authenticate('local-signin', {
		successRedirect: '/dashboard',
		failureRedirect: '/signin'
	}));
};