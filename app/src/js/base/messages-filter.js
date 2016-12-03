define(['doc'], function($) {

    var MESSAGE_STORAGE_KEY = 'flash_message',
        message = JSON.parse(localStorage.getItem(MESSAGE_STORAGE_KEY));

    if (message != null) {
        var $messageContainer = $('.messages-container'),
            $messageContent = $messageContainer.find('.content');

        $messageContent.text(message.message);
        $messageContainer.addClass(message.type);

        var messageContainer = $messageContainer.first(),
            current = 0;

        setTimeout(function() {
            $messageContainer.addClass('disappear');
            setTimeout(function() {
                $messageContainer.addClass('hide');
            },1000)
        },3500);
        localStorage.removeItem(MESSAGE_STORAGE_KEY);
    }
});