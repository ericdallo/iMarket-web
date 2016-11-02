define('loggedUser', [], function() {

	var STORAGE_KEY = 'loggedUser';

	return {
		'store': function(user) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
			console.log('saving user: ', user);
		},
		'get': function() {
			var loggedUser = localStorage.getItem(STORAGE_KEY);
			if (loggedUser != null) {
				console.log('retrieving user: ', loggedUser);
				return JSON.parse(loggedUser);
			}
		},
		'logout': function() {
			localStorage.removeItem(STORAGE_KEY);
		}
	}
});