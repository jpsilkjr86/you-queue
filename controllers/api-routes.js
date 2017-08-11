// exports as a function which takes in express app and passport parameters
module.exports = (app, db, passport) => {
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
			// instantiates locally scoped variables to be used in new customer object
			let restaurant_id;
			let occasion;
			// if occasion is array, joins as string
			if (Array.isArray(req.body.occasion)) {
				occasion = req.body.occasion.join();
			} else {
				occasion = req.body.occasion;
			}
			// gets restaurant_id by querying user data
			db.TestTable.findOne({where: {email: req.user.email}}).then(result => {
				// saves restaurant id as result.id (of user)
				restaurant_id = result.id;
				// instantiates locally scoped customer object, values determined by 
				// req.body, req.user and some other defaults.
				const customer = {
					party_name: req.body.party_name,
					party_size: req.body.party_size,
					phone_number: req.body.phone_number,
					email: req.body.email,
					occasion: occasion,
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					restaurant_id: restaurant_id,
					active: true,
					arrived_table: false,
					alerted_sms: false
				};
				console.log(customer);
				// attempts to add to database
				 return db.CustTable.create(customer);
			}).then(result => {
				console.log(result);
				// set session success message
				res.redirect('/');
			}).catch(err => {
				console.log('FAILED TO GET USER DATA WHEN ADDING CUSTOMER');
				// set session error message
				res.redirect('/');
			});
		}
	});
};