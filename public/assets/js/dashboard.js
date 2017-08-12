$(document).ready(function(){
	// creates remove event for dismissible content
	// (https://github.com/Dogfalo/materialize/issues/803)
	(function() {
		console.log('remove event added');
		var ev = new $.Event('remove'),
			orig = $.fn.remove;
		$.fn.remove = function() {
			$(this).trigger(ev);
			return orig.apply(this, arguments);
		}
	})();

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

	// when customer row is dismissed, sends ajax request to cancel (set active to false)
	$('.customer-row').bind('remove', function () {
		// removing element from the DOM triggers ajax cancel request
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