define(['doc', 'ajax', 'form', 'loggedUser','facebook', 'ENV'], function($, ajax, form, $loggedUser, facebook, ENV) {
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
                    var user = $loggedUser.store(response);
                    if ($loggedUser.isMarket()) {
                        window.location = "/" + user.url + "/mercado";
                    } else {
                        window.location = "/";
                    }
                },
                'error': function(response, xhr) {
                    showMessage('.invalid-fields-message');
                },
                'complete': function(xhr) {
                }
            },{async: true});
        },
        error: function() {
            showMessage('.empty-fields-message');
        }
    });

    $form.find('.btn-facebook').on('click', function(event) {
        event.preventDefault();

        facebook.register({
            'success': function (user) {
                window.location = '/';
            },
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