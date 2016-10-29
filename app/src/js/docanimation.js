define('docanimation', ['doc'], function($) {
    'use strict'

    return {
        'fadeOut': function($element, time, callback) {
            if (time === undefined) {
                time = 10;
            }

            var element = $element.first();

            var op = 1;
            var timer = setInterval(function () {
                if (op <= 0.1){
                    clearInterval(timer);
                    element.style.display = 'none';
                    callback.call();
                }
                element.style.opacity = op;
                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op -= op * 0.1;
            }, time);
        }
    }
});