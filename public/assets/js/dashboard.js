$(document).ready(function(){
	// activates collapsible side nav
	$(".button-collapse").sideNav();
	

	// functionality for alerted_sms
	$(document).on('click', '.sms-btn', function () {
		
		$.post('/customer/alerted', {
			alerted_sms: true, 
			id: $(this).attr('data-id')
		}).done(function(data) {
		 	console.log(data);
		
		}).catch(function(err) {
			console.log(err);
		});
	});

    // functionality for cancelling customer
	$(document).on('click', '.cancel-btn', function () {
		
		$.post('/customer/cancel', {
			active: false, 
			id: $(this).attr('data-id')
		}).done(function(data) {
		 	console.log(data);
		
		}).catch(function(err) {
			console.log(err);
		});
	});


	// functionality for arrived table
	$(document).on('click', '.arrived-btn', function () {
		
		$.post('/customer/arrived', {
			arrived_table: true, 
			active: false,
			id: $(this).attr('data-id')
		}).done(function(data) {
		 	console.log(data);
		
		}).catch(function(err) {
			console.log(err);
		});
	});



});

