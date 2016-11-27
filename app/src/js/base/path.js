define('path', ['ENV'], function(ENV) {
    'use strict'

    return {
        'redirect': function(path){
            if (arguments.length === 1) {
                window.location = path;
                return;
            }
            var newPath = path;
            for (var i = 1; i < arguments.length; i++) {
                newPath = path.replace('{' + (i-1) + '}', arguments[i]);
            }
            window.location = newPath;
        },
        'home': function() {
            window.location = '/';
        }
    }
});