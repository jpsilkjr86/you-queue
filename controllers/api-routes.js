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
	// route for adding new customers
	app.post('/customer/add', (req, res) => {
		if (!req.user) {
			res.redirect('/signin');
			// display message saying that form submission failed, plz sign in
		}
		else {
			// instantiates locally scoped customer object, values determined by 
			// req.body, req.user and some other defaults.
			const customer = {
				party_name: req.body.party_name,
				party_size: req.body.party_size,
				phone_number: req.body.phone_number,
				email: req.body.email,
				occasion: req.body.occasion,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				restaurant_id: req.user.id,
				active: true,
				arrived_table: false,
				alerted_sms: false
			};
			console.log(customer);
			res.json(customer);
		}
	});
};