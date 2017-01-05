define(['doc', 'form', 'alert', 'loginService', 'facebook'], function($, form, alert, $loginService, $facebook) {
    'use strict'

    var $form = $('#registerForm');

    form.validate('#registerForm', {
        success: function(event) {
            event.preventDefault();

            var name = $(this).find('[name="name"]').val(),
                email = $(this).find('[name="email"]').val(),
                password = $(this).find('[name="password"]').val(),
                confirmPassword = $(this).find('[name="confirm-password"]').val(),
                terms = $(this).find('[name="terms"]').first().checked,
                acceptNewsletter = $(this).find('[name="newsletter"]').first().checked;

            if (!terms) {
                alert.error('.terms-required-message');
                return;
            }

            if (password !== confirmPassword) {
                alert.error('.passwords-not-match-message');
                return;
            }

            $loginService.register(name, email, password, 'IMARKET', acceptNewsletter, {
                'error': function() {
                    alert.error('.email-already-exists-message');
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
                alert.error('.email-already-exists-message');
            }
        });
    });
});