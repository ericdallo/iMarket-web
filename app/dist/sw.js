var CACHE_VERSION = 'v1',
    URLS_TO_CACHE = [
    '/assets/images/logo.png',
    '/assets/images/home-bg.jpg',
    '/bower_components/doc-amd/doc.js',
    '/bower_components/async-define/async-define.js',
    '/bower_components/ajax-amd/ajax.js',
    '/bower_components/events-amd/events-amd.js',
    '/assets/images/banner.svg',
    '/assets/fonts/amatic-bold.ttf'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function(cache) {
                return cache.addAll(URLS_TO_CACHE);
            })
            .catch(function(err) {
                console.error('Error installing serviceWorker', err);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).then(function(response) {
            if(response) {
                return response;
            }
        }).catch(function() {
            return caches.match(event.request)
                .then(function(response) {
                    if(response) {
                        return response;
                    }
                }).catch(function(err){
                    console.error('Error fetching serviceWorker cache', err);
                })
        })
    );
});
