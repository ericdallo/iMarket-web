define(['doc', 'ajax', 'form', 'ENV'], function($, ajax, form, ENV) {
	'use strict'

	var $form = $('#loginForm');

	form.validate('#loginForm', {
        success: function(event) {
            event.preventDefault;

            var loginData = {
                username: $(this).find('[name="email"]').val(),
                password: $(this).find('[name="password"]').val()
            };

            ajax.post(ENV.api.login, loginData, {
                'success': function(response, xhr) {
                    window.location = "/";
                },
                'error': function(response, xhr) {
                    showMessage('.empty-fields-message');
                },
                'complete': function(xhr) {
                }
            },{async: true});
        },
        error: function() {
            showMessage('.empty-fields-message');
        }
    });

    var showMessage = function(messageClass) {
        var $invalidMessage = $form.find(messageClass);
        $invalidMessage.toggleClass('hide');
        setTimeout(function() {
            $invalidMessage.addClass('hide');
        },4000);
    }
});