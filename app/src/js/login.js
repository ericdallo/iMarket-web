define(['doc', 'ajax', 'form', 'loggedUser', 'loginService','facebook', 'ENV'], function($, ajax, form, $loggedUser, $loginService, facebook, ENV) {
    'use strict'

    var $form = $('#loginForm');

    form.validate('#loginForm', {
        success: function(event) {
            event.preventDefault();

            var username = $(this).find('[name="email"]').val(),
                password = $(this).find('[name="password"]').val();

            $loginService.login(username, password, {
                'error': function() {
                    showMessage('.invalid-fields-message');
                }
            });
        },
        error: function() {
            showMessage('.empty-fields-message');
        }
    });

    $form.find('.btn-facebook').on('click', function(event) {
        event.preventDefault();

        facebook.register({
            error: function() {
                showMessage('.email-already-exists');
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