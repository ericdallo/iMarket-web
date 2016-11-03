define(['doc', 'ajax', 'form', 'loggedUser', 'ENV'], function($, ajax, form, $loggedUser, ENV) {
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
                    $loggedUser.store(response);                    
                    window.location = "/";
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
        FB.login(function(response){
          if (response.status === 'connected') {
            window.location = '/';
            console.log('con',response);
          } else if (response.status === 'not_authorized') {
            console.log('not_a',response);
          } else {
            console.log('erro');
          }
        }, {scope: 'public_profile,email'});
    });

    var showMessage = function(messageClass) {
        var $invalidMessage = $form.find(messageClass);
        $invalidMessage.toggleClass('hide');
        setTimeout(function() {
            $invalidMessage.addClass('hide');
        },4000);
    }
});