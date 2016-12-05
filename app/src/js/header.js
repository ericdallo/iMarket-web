define(['doc', 'loginService', 'loggedUser', 'path'], function($, $loginService, $loggedUser, $path) {
    'use strict'

    var ESC_KEY = 27,
        loggedUser = $loggedUser.get();

    if (loggedUser != null) {
        $('.unlogged').addClass('hide');
        $('.logged').removeClass('hide');
        $('.menu').removeClass('hide');

        $('.side-menu .user-name').text(loggedUser.name);
    }

    $('.logout').on('click', function(event) {
        event.preventDefault();
        $loginService.logout();
        $path.home();
    });

    $("div.black-filter").on('click', function() {
       $('#menu-switch').first().checked = false;
    });

    $('body').on('keydown', function(event) {
        var $menuSwitch = $('#menu-switch');
        if (event.keyCode === ESC_KEY && $menuSwitch.first().checked) {
            $menuSwitch.first().checked = false;
        }
    });

    var $main = $('body > main'),
        $headerContent = $('.header .content'),
        headerBanner = $('.header .banner').first();

    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= headerBanner.offsetHeight) {
            $headerContent.addClass('fixed');
            $main.addClass('fixed-header');
        } else {
            $headerContent.removeClass('fixed');
            $main.removeClass('fixed-header');
        }
    });
});
