define(['doc', 'form', 'alert', 'loginService', 'facebook'], function($, form, alert, $loginService, $facebook) {
    'use strict'

    var $form = $('#loginForm');

    form.validate('#loginForm', {
        success: function(event) {
            event.preventDefault();

            var username = $(this).find('[name="email"]').val(),
                password = $(this).find('[name="password"]').val();

            $loginService.login(username, password, {
                'error': function() {
                    alert.error('.invalid-fields-message');
                }
            });
        },
        error: function() {
            alert.error('.empty-fields-message');
        }
    });

    $form.find('.btn-facebook').on('click', function(event) {
        event.preventDefault();

        $facebook.register({
            error: function() {
                alert.error('.email-already-exists');
            }
        });
    });
});