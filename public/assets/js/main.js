$(document).ready(function(){
	// activates modals
	$('.modal').modal();

	// captures user login input
	$(document).on('submit', '#sign-in', function(e){
		// prevents page from automatically reloading
		e.preventDefault();
		// saves form input values as variables
		let email = $('#email-existing').val().trim();
		let password = $('#password-existing').val().trim();

		// form validation function here

		// creates user data object
		let user = {email, password};

		// ajax post request
		$.post('/user/login', user).done(function(data){
			console.log(data);
			// clears all input fields
			$('input').val('');
		}).catch(function(err){
			console.log(err);
		});
	});

	// captures new account input
	$(document).on('submit', '#new-account', function(e){
		// prevents page from automatically reloading
		e.preventDefault();
		// saves form input values as variables
		let first_name = $('#first_name').val().trim();
		let last_name = $('#last_name').val().trim();
		let company_name = $('#company_name').val().trim();
		let phone_number = parseInt($('#phone_number').val().trim());
		let email = $('#email-new').val().trim();
		let password = $('#password-new').val().trim();

		// form validation function here

		// creates new user data object
		let newUser = {first_name, last_name, company_name, phone_number, email, password};
		console.log(newUser);

		// ajax post request
		$.post('/user/new', newUser).done(function(data){
			console.log(data);
			// clears all input fields
			$('input').val('');
		}).catch(function(err){
			console.log(err);
		});
	});

});