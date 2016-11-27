define(['doc', 'loginService', 'loggedUser', 'path'], function($, $loginService, $loggedUser, $path) {
    'use strict'

    var loggedUser = $loggedUser.get();

    if (loggedUser != null) {
        $('.unlogged').addClass('hide');
        $('.logged').removeClass('hide');
        $('.menu').removeClass('hide');
    }

    $('.logout').on('click', function(event) {
        event.preventDefault();
        $loginService.logout();
        $path.home();
    });

    $('#menu-switch').on('change', function() {
        if (this.checked) {
            
        } else {

        }
    });
});