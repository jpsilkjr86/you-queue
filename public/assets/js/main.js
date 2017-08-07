$(document).ready(function(){
	// activates modals
	$('.modal').modal();

	// captures form input
	$(document).on('submit', '#sign-in', function(e){
		console.log('working');
		// prevents page from automatically reloading
		e.preventDefault();
		// saves form input values as variables
		let email = $('#email').val().trim();
		let password = $('#password').val().trim();

		// form validation function here

		// creates form data object
		let user = {email, password};

		// ajax post request
		$.post('/user/login', user).done(function(data){
			console.log(data);
		}).catch(function(err){
			console.log(err);
		});

	});

});