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

	// loops through each sms-btn, checks the box and makes it green if data-alerted_sms = true
	$('.sms-btn').each(function(i){
		let alerted = $(this).attr('data-alerted_sms');
		if (alerted == true || alerted == 'true') {
			// adds materialize class 'green'
			$(this).addClass('green');
		}
	});

	// functionality for alerted_sms
	$(document).on('click', '.sms-btn', function () {
		// instantiates locally scoped variables. 'this' needs to be saved
		// because asynchronous functions will lose the reference.
		let thisBtn = $(this);
		let alerted = thisBtn.attr('data-alerted_sms');
		// only sends request if alerted == false
		if (alerted == false || alerted == 'false') {
			// ajax request for sms alert
			$.post('/customer/alerted', {
				alerted_sms: true, 
				id: $(this).attr('data-id')
			}).done(function(data) {
			 	console.log(data);
				// adds materialize class 'green'
				thisBtn.addClass('green');
				// changes data-alerted_sms to true
				thisBtn.attr('data-alerted_sms', true);
			}).catch(function(err) {
				console.log(err);
			});
		}			
	});

    // functionality for clicking cancel-btn for customer
	$(document).on('click', '.cancel-btn', function () {
		// triggers custom 'remove' event for the closest ancestor of class .customer-row
		$(this).closest('.customer-row')
			.trigger('remove');
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
		// instantiates locally scoped variables. 'this' needs to be saved
		// because asynchronous functions will lose the reference.
		let thisBtn = $(this);
		let arrived = thisBtn.attr('data-arrived_table');
		// only do this if data-arrived_table == false
		if (arrived == false || arrived == 'false') {
			// ajax request to update arrived status
			$.post('/customer/arrived', {
				arrived_table: true, 
				active: false,
				id: $(this).attr('data-id')
			}).done(function(data) {
			 	console.log(data);
				// changes data-arrived_table to true
				thisBtn.attr('data-arrived_table', true);
				// changes icon to checked box
				thisBtn.html('<i class="material-icons">check_box</i>');		
			}).catch(function(err) {
				console.log(err);
			});
		}
	});
});