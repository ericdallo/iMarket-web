define('modal', ['doc'], function($) {
    'use strict'

    return {
        'show': function(element, action) {
            var $element = $(element);
            $element.addClass('modal-open');

            $('.modal-container').addClass('modal-container-open');

            action.call();
        }
    }
});