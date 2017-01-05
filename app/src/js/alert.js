define('alert', ['doc'], function($) {

    var showMessage = function(messageClass) {
        var $invalidMessage = $(messageClass);
        $invalidMessage.toggleClass('hide');
        setTimeout(function() {
            $invalidMessage.addClass('hide');
        },4000);
    };

    return {
        'error': function(messageClass) {
            showMessage(messageClass);
        }
    }
});