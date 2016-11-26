var loggedUser = localStorage.getItem('loggedUser');

if (loggedUser == null || JSON.parse(loggedUser).loginType != 'MARKET') {
	window.location = '/login?redirectUrl=' + encodeURIComponent(window.location.pathname);
}
