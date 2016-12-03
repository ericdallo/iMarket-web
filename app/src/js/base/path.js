define('path', ['ENV'], function(ENV) {
    'use strict'

    var getParameter = function(name, url) {
        if (!url) {
          url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

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
        },
        'getParameter': function(name, url) {
            return getParameter(name, url);
        }
    }
});