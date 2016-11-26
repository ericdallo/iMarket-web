var loggedUser = localStorage.getItem('loggedUser');

if (loggedUser == null) {
	window.location = '/login?redirectUrl=' + encodeURIComponent(window.location.pathname);
} else if (JSON.parse(loggedUser).loginType != 'BUYER') {
	window.location = '/'
}
