define(['doc'], function($) {
    'use strict'

    var $carousel = $('.carousel');
    var $options = $carousel.find('input[name="carousel-slider"]');

    function changeSlide() {
        var $selectedOption = $options.filter('checked');

        if ($options.last() === $selectedOption.first()) {
            $options.first().checked = true;
        } else {
            $selectedOption.next().first().checked = true;
        }
    };

    setInterval(changeSlide, 4000);
});
