define('service-worker', [], function(){

	if('serviceWorker' in navigator) {
		return navigator.serviceWorker.register('/sw.js')
			.then(function(registration) {
				console.log('ServiceWorker registration successful with scope: ', registration.scope);
				return registration;
			}).catch(function(err){
				console.log('ServiceWorker registration failed: ', err);
			});
	}
});
