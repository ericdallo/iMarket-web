define('ENV', [], function() {
    'use strict'

    var baseApi = 'http://localhost:9090/';

    return {
        'api': {
            'premarkets': baseApi + 'premarkets',
            'login': baseApi + 'login'
        }
    }
});