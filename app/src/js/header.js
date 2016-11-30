define(['doc', 'loginService', 'loggedUser', 'path'], function($, $loginService, $loggedUser, $path) {
    'use strict'

    var ESC_KEY = 27,
        loggedUser = $loggedUser.get(),
        $menuSwitch = $('#menu-switch'),
        $mainContent = $('body > main'),
        $filter = $("div.black-filter");

    if (loggedUser != null) {
        $('.unlogged').addClass('hide');
        $('.logged').removeClass('hide');
        $('.menu').removeClass('hide');

        $('.side-menu .buyer-name').text(loggedUser.name);
    }

    $('.logout').on('click', function(event) {
        event.preventDefault();
        $loginService.logout();
        $path.home();
    });

    $filter.on('click', function() {
       $menuSwitch.first().checked = false;
    });

    $('body').on('keydown', function(event) {
        if (event.keyCode === ESC_KEY && $menuSwitch.first().checked) {
            $menuSwitch.first().checked = false;
        }
    });
});