define('loginService',['http', 'loggedUser', 'path', 'ENV'], function($http, $loggedUser, $path, ENV) {
    'use strict'

    function isFunction(fn) {
        return fn && typeof fn === "function";
    }

    var saveLoggedUser = function(user) {
        $loggedUser.store(user);        
        if ($loggedUser.isMarket()) {
            $path.redirect(ENV.market.home, user.url);
        } else {
            $path.redirect(ENV.user.home);
        }
    };
    
    return {
        'login': function(username, password, callback) {
            var loginData = {
                username: username,
                password: password
            };

            $http.postForm(ENV.api.login, loginData, {
                success: function(response) {
                    saveLoggedUser(JSON.parse(response));
                    if (isFunction(callback.success)) {
                        callback.success(user, this);
                    }
                },
                error: function(response) {
                    if (isFunction(callback.error)) {
                        callback.error();
                    }
                }
            });
        },
        'register': function(name, username, password, loginOrigin, callback) {
            var registerData = {
                name: name,
                email: username,
                password: password,
                login_origin: loginOrigin
            };

            $http.post(ENV.api.register, registerData, {
                success: function(response) {
                    saveLoggedUser(response);
                    if (isFunction(callback.success)) {
                        callback.success(response, this);
                    }
                },
                error: function(response) {
                    if (isFunction(callback.error)) {
                        callback.error(response, this);
                    }
                }
            });
        },
        'logout': function() {
            $loggedUser.logout();
            $http.delete(ENV.api.login,{}, {});
        }
    } 
});