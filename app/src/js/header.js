define(['doc', 'loginService', 'loggedUser'], function($, $loginService, $loggedUser) {
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
        window.location = "/";
    });
});