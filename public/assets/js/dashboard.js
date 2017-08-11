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
	
    // functionality for pressing cancel to cancel a user (sets active status to false)
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
});

