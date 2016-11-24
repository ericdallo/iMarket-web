define('loggedUser', [], function() {

    var STORAGE_KEY = 'loggedUser',
        MARKET = 'MARKET',
        BUYER = 'BUYER';

    var get = function() {
        var loggedUser = localStorage.getItem(STORAGE_KEY);
        if (loggedUser != null) {
            return JSON.parse(loggedUser);
        }
        return null;
    }

    return {
        'store': function(user) {
            localStorage.setItem(STORAGE_KEY, user);
            return JSON.parse(user);
        },
        'get': function() {
            return get();
        },
        'logout': function() {
            localStorage.removeItem(STORAGE_KEY);
        },
        'isBuyer': function() {
            var user = get();
            return user != null && user.loginType == BUYER;
        },
        'isMarket': function() {
            var user = get();
            return user != null && user.loginType == MARKET;
        }
    }
});