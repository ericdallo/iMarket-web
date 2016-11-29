define(['doc', 'loginService', 'loggedUser', 'path'], function($, $loginService, $loggedUser, $path) {
    'use strict'

    var loggedUser = $loggedUser.get(),
        $menuSwitch = $('#menu-switch'),
        $sideMenu = $('.side-menu');

    if (loggedUser != null) {
        $('.unlogged').addClass('hide');
        $('.logged').removeClass('hide');
        $('.menu').removeClass('hide');

        $sideMenu.find('.buyer-name').text(loggedUser.name);
    }

    $('.logout').on('click', function(event) {
        event.preventDefault();
        $loginService.logout();
        $path.home();
    });

    $menuSwitch.on('change', function() {
        if (this.checked) {
            
        } else {

        }
    });

    $('body').on('keydown', function(event) {
        if (event.keyCode === 27 && $menuSwitch.first().checked) {
            $menuSwitch.first().checked = false;
        }
    });
});