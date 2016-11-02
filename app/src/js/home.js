define(['doc', 'form', 'loggedUser'], function($, form, $loggedUser) {
	'use strict'

	var loggedUser = $loggedUser.get();

	if (loggedUser != null) {
		$('.unlogged').addClass('hide');
		$('.logged').removeClass('hide');
	}

	$('.logout').on('click', function(event) {
		event.preventDefault();
		$loggedUser.logout();
		location.reload();
	});

	form.mask('.cep-form .field', "#####-###", form.CEP_SIZE);
});