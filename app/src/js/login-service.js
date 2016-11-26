define('loginService',['ajax', 'loggedUser', 'ENV'], function(ajax, $loggedUser, ENV) {
    'use strict'

    var saveLoggedUser = function(user) {
        $loggedUser.store(user);
        if ($loggedUser.isMarket()) {
            window.location = "/" + user.url + "/mercado";
        } else {
            window.location = "/meus-mercados";
        }
    };
    
    return {
        'login': function(username, password, callback) {
            var loginData = {
                username: username,
                password: password
            };

            ajax.post(ENV.api.login, loginData, {
                'success': function(response, xhr) {
                    saveLoggedUser(response);
                    callback.success(user, this);
                },
                'error': function(response, xhr) {
                    callback.error();
                }
            },{async: true});
        },
        'register': function(name, username, password, loginOrigin, callback) {
            var registerData = {
                name: name,
                email: username,
                password: password,
                login_origin: loginOrigin
            };

            ajax.post(ENV.api.register, registerData, {
                'success': function(response, xhr) {
                    saveLoggedUser(response);
                    callback.success(response, this);
                },
                'error': function(response, xhr) {
                    callback.error(response, this);
                }
            },{
                async: true,
                headers : {
                    "Content-Type": "application/json"
                }
            });
        },
        'logout': function() {
            $loggedUser.logout();
            ajax.post(ENV.api.login + '?_method=DELETE',{}, {},{
                async: true,
                headers : { "Content-Type": "application/json"}
            });
        }
    } 
});