define(['doc', 'form', 'loginService','facebook'], function($, form, $loginService, $facebook) {
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
                showMessage('.terms-required-message');
                return;
            }

            if (password !== confirmPassword) {
                showMessage('.passwords-not-match-message');
                return;
            }

            $loginService.register(name, email, password, 'IMARKET', acceptNewsletter, {
                'error': function() {
                    showMessage('.email-already-exists-message');
                }
            });
        },
        error: function() {
            showMessage('.empty-fields-message');
        }
    });

    $form.find('.btn-facebook').on('click', function(event) {
        event.preventDefault();

        $facebook.register({
            error: function() {
                showMessage('.email-already-exists-message');
            }
        });
    });

    var showMessage = function(messageClass) {
        var $invalidMessage = $form.find(messageClass);
        $invalidMessage.toggleClass('hide');
        setTimeout(function() {
            $invalidMessage.addClass('hide');
        },4000);
    }
});