define('messages', [], function() {
    'use strict'

    var MESSAGE_STORAGE_KEY = "flash_message",
        SUCCESS = "success";

    var addMessage = function(message, type) {
        var messageData = {
            message: message,
            type: type
        }
        localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(messageData));
    };

    return {
        'addSuccess': function(message) {
            addMessage(message, SUCCESS);
        }
    }
});