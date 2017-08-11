$(document).ready(function(){
	// activates collapsible side nav
	$(".button-collapse").sideNav();
	
    // functionality for posting eat-state
	$(document).on('click', '.cancel-btn', function () {
		//console.log($(this).attr('data-active'));

		// let thisBurger = $(this).attr('value');
		// // posts it to the surver
		$.post('/customer/cancel', {
			active: false, 
			id: $(this).attr('data-id')
		}).done(function(data) {
		 	console.log(data);
		
		}).catch(function(err) {
			console.log(err);
		});
	});



});

