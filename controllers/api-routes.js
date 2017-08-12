// import sms client
const youQueueSMS = require('../custom_modules/youqueue-sms.js');

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
			req.session.notice = 'Please sign in!';
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
			db.UserTable.findOne({where: {email: req.user.email}}).then(result => {
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
				console.log('CUSTOMER SUCCESSFULLY ADDED!');
				console.log(result);
				req.session.success = 'Customer successfully added!';
				// set session success message
				res.redirect('/');
			}).catch(err => {
				console.log('FAILED TO ADD CUSTOMER');
				console.log(err);
				req.session.error = 'Failed to add customer.';
				// set session error message
				res.redirect('/');
			});
		}
	});

    // route for alerting sms to customer
	app.post('/customer/alerted', (req, res) => {
		if (!req.user) {
			res.redirect('/signin');
			// display message saying that form submission failed, plz sign in
		}
		else {
			//from req.body.id information, runs query to get phone number 
			db.CustTable.findOne({where: {id: req.body.id}}).then(result => {
            //then do text magic function
            	let phone_number = '1' + result.phone_number;
            	let message = 'You-Queue Alert for ' + result.party_name + ': Your table is ready!'
							+ ' Please come at your earliest convenience.'
							+ ' Enjoy your meal! (AUTO-SMS:Do not reply!)';

				youQueueSMS.Messages.send({text: message, phones: phone_number}, (err, res_sms) => {
					//console.log('Messages.send()', err, res);
					if (err) {
						console.log(err);
						req.session.error = 'Failed to send text message.';
						res.send('SMS message failed');
					} else {
						console.log('SMS message successfully sent!');
						console.log(res_sms);
						db.CustTable.update( { 
							alerted_sms: req.body.alerted_sms 
						} , {
							where: {
								id: req.body.id
							}
						}).then(updateResult => {
							console.log("CUSTOMER HAS BEEN ALERTED BY TEXT MESSAGE");
							req.session.success = 'Text message successfully sent!';
							res.send("CUSTOMER HAS BEEN ALERTED BY TEXT MESSAGE");
						}).catch(error => {
							console.log('FAILED TO UPDATE DATABASE');
							console.log(error);
							req.session.notice = 'Text message may have failed to send.';
							res.redirect('/');
						});
					}						
				});
			});
		}
	});


	// route for cancelling a customer
	app.post('/customer/cancel', (req, res) => {
		if (!req.user) {
			res.redirect('/signin');
			// display message saying that form submission failed, plz sign in
		}
		else {
			db.CustTable.update( {
				active: req.body.active
			} , {
				where: {
					id: req.body.id
				}
			}).then(result => {
				console.log('CUSTOMER ACTIVE STATUS SUCCESSFULLY UPDATED');
				req.session.success = 'Customer status successfully updated!';
				res.send('CUSTOMER ACTIVE STATUS SUCCESSFULLY UPDATED');
			}).catch(err => {
				console.log('FAILED TO UPDATE CUSTOMER ACTIVE STATUS');
				req.session.err = 'Failed to update customer status.';
				// set session error message
				res.redirect('/');
			});
		}
	});

    // route for arrived at table
	app.post('/customer/arrived', (req, res) => {
		if (!req.user) {
			res.redirect('/signin');
			// display message saying that form submission failed, plz sign in
		}
		else {
			db.CustTable.update( { 
				active: req.body.active, 
				arrived_table: req.body.arrived_table 
			} , {
				where: {
					id: req.body.id
				}
			}).then(result => {
				console.log('CUSTOMER HAS BEEN SEATED AT TABLE');
				req.session.success = 'Customer arrived status updated!';
				res.send('CUSTOMER HAS BEEN SEATED AT TABLE');
			}).catch(err => {
				console.log('FAILED TO UPDATE CUSTOMER TABLE STATUS');
				// set session error message
				req.session.error = "Failed to update customer's table status";
				res.redirect('/');
			});
		}
	});
};
