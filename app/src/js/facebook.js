window.fbAsyncInit = function() {
    FB.init({
        appId      : '181292992317302',
        xfbml      : true,
        version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

define('facebook', ['loginService'], function($loginService) {

    return {
        'register': function(callback) {
            FB.login(function(response){
                if (response.status === 'connected') {
                    FB.api("/me?fields=email,name", function (data) {
                        if (data && !data.error) {
                            $loginService.register(data.name, data.email, data.id, 'FACEBOOK', true, callback);
                        }
                    });
                } else {
                    callback.error();
                }
            }, {scope: 'public_profile,email'});
        }
    }
});