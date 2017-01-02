define('http', ['ajax'], function(ajax) {

    function isFunction(fn) {
        return fn && typeof fn === "function";
    }

    var requestPost = function(endpoint, data, callback, headers) {
        var callback = callback || {};

        ajax.post(endpoint, data, {
            'success': function(response, xhr) {
                if (isFunction(callback.success)) {
                    callback.success(response, this);
                }
            },
            'error': function(response, xhr) {
                if (isFunction(callback.error)) {
                    callback.error(xhr, this);
                }
            },
            'complete': function(xhr) {
                if (isFunction(callback.complete)) {
                    callback.complete();
                }
            }
        },{
            async: true,
            headers : headers
        });
    }

    var requestDelete = function(endpoint, data, callback) {
        var callback = callback || {};

        ajax.delete(endpoint, data, {
            'success': function(response, xhr) {
                if (isFunction(callback.success)) {
                    callback.success(response, this);
                }
            },
            'error': function(response, xhr) {
                if (isFunction(callback.error)) {
                    callback.error(xhr, this);
                }
            },
            'complete': function(xhr) {
                if (isFunction(callback.complete)) {
                    callback.complete();
                }
            }
        },{async: true});
    }

    return {
        'post': function(endpoint, data, callback) {
            var headers = { "Content-Type": "application/json" };
            requestPost(endpoint, data, callback, headers);
        },
        'postForm': function(endpoint, data, callback) {
            var headers = { "Content-Type": "application/x-www-form-urlencoded" };
            requestPost(endpoint, data, callback, headers);
        },
        'delete': function(endpoint, data, callback) {
            requestDelete(endpoint, data, callback);
        },

    }
});